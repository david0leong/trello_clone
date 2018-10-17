import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import flow from 'lodash/fp/flow'
import update from 'lodash/fp/update'
import set from 'lodash/fp/set'

import union from 'lodash/union'
import without from 'lodash/without'
import omit from 'lodash/omit'

import {
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_FAILURE,
  ADD_BOARD_SUCCESS,
  UPDATE_BOARD_SUCCESS,
  DELETE_BOARD_SUCCESS,
  ADD_COLUMN_SUCCESS,
  UPDATE_COLUMN_SUCCESS,
  DELETE_COLUMN_SUCCESS,
} from './actionTypes'
import { boardListSchema } from './schemas'

import { selectBoardById } from './boards/selectors'
import { selectColumnById } from './columns/selectors'

const initialState = {
  loading: false,
  boards: {
    allIds: [],
    byId: {},
  },
  columns: {
    allIds: [],
    byId: {},
  },
  tasks: {
    allIds: [],
    byId: {},
  },
}

/**
 * Add entities to normalized store
 *
 * @param {Object} store - Normalized Store
 * @param {Object} entities - Map of entities to add
 *
 * @returns {Object} - Updated store
 */
const addEntitiesToStore = (store, entities) =>
  flow(
    update('allIds', allIds => union(allIds, Object.keys(entities))),
    update('byId', byId => Object.assign({}, byId, entities))
  )(store)

/**
 * Delete entities from normalized store by Id
 *
 * @param {Object} store - Normalized Store
 * @param {number[]} entityIds - Array of entity IDs to remove
 *
 * @returns {Object} - Updated store
 */
const deleteEntitiesFromStore = (store, entityIds) =>
  flow(
    update('allIds', allIds => without(allIds, ...entityIds)),
    update('byId', byId => omit(byId, entityIds))
  )(store)

/**
 * Delete column deeply, that is, along with tasks that belongs to column given
 *
 * @param {Object} store - Redux store
 * @param {number} columnId - Column Id
 *
 * @returns {Object} - Updated store
 */
const deleteColumnDeep = columnId => store => {
  const column = selectColumnById(store, columnId)
  const ops = []

  // Delete tasks deeply
  if (column) {
    ops.push(
      update('tasks', tasks => deleteEntitiesFromStore(tasks, column.tasks))
    )
  }

  // Delete column
  ops.push(
    update('columns', columns => deleteEntitiesFromStore(columns, [columnId]))
  )

  return flow(...ops)(store)
}

/**
 * Delete board deeply, that is, along with columns and tasks that belongs to board given
 *
 * @param {Object} store - Redux store
 * @param {number} boardId - Board Id
 *
 * @returns {Object} - Updated store
 */
const deleteBoardDeep = boardId => store => {
  const board = selectBoardById(store, boardId)
  const ops = []

  // Delete columns deeploy
  if (board) {
    ops.push(...board.columns.map(columnId => deleteColumnDeep(columnId)))
  }

  // Delete board
  ops.push(
    update('boards', boards => deleteEntitiesFromStore(boards, [boardId]))
  )

  return flow(...ops)(store)
}

export default handleActions(
  {
    [LOAD_BOARDS_REQUEST](state) {
      return set('loading', true)(state)
    },

    [LOAD_BOARDS_SUCCESS](state, action) {
      const normalizedData = normalize(action.payload, boardListSchema)
      const ops = [set('loading', false)]

      if (normalizedData.entities.boards) {
        ops.push(
          update('boards', boards =>
            addEntitiesToStore(boards, normalizedData.entities.boards)
          )
        )
      }

      if (normalizedData.entities.columns) {
        ops.push(
          update('columns', columns =>
            addEntitiesToStore(columns, normalizedData.entities.columns)
          )
        )
      }

      if (normalizedData.entities.tasks) {
        ops.push(
          update('tasks', tasks =>
            addEntitiesToStore(tasks, normalizedData.entities.tasks)
          )
        )
      }

      return flow(...ops)(state)
    },

    [LOAD_BOARDS_FAILURE](state, action) {
      return set('loading', false)(state)
    },

    [ADD_BOARD_SUCCESS](state, action) {
      // Add empty columns array
      const newBoard = { ...action.payload, columns: [] }

      return update('boards', boards =>
        addEntitiesToStore(boards, {
          [newBoard.id]: newBoard,
        })
      )(state)
    },

    [UPDATE_BOARD_SUCCESS](state, action) {
      const updatedBoard = action.payload

      return update(['boards', 'byId', updatedBoard.id], board =>
        Object.assign({}, board, updatedBoard)
      )(state)
    },

    [DELETE_BOARD_SUCCESS](state, action) {
      const boardId = action.payload

      return deleteBoardDeep(boardId)(state)
    },

    [ADD_COLUMN_SUCCESS](state, action) {
      // Add empty tasks array
      const newColumn = { ...action.payload, tasks: [] }

      return flow(
        update('columns', columns =>
          addEntitiesToStore(columns, {
            [newColumn.id]: newColumn,
          })
        ),
        // Add column Id to parent board
        update(
          ['boards', 'byId', `${newColumn.board_id}`, 'columns'],
          boardColumns => boardColumns.concat(newColumn.id)
        )
      )(state)
    },

    [UPDATE_COLUMN_SUCCESS](state, action) {
      const updatedColumn = action.payload

      return update(['columns', 'byId', updatedColumn.id], column =>
        Object.assign({}, column, updatedColumn)
      )(state)
    },

    [DELETE_COLUMN_SUCCESS](state, action) {
      const columnId = action.payload

      return deleteColumnDeep(columnId)(state)
    },
  },
  initialState
)
