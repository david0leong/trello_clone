import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import flow from 'lodash/fp/flow'
import update from 'lodash/fp/update'
import set from 'lodash/fp/set'

import union from 'lodash/union'
import without from 'lodash/without'
import pick from 'lodash/pick'
import omit from 'lodash/omit'

import {
  // BOARD
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_FAILURE,
  LOAD_BOARD_SUCCESS,
  ADD_BOARD_SUCCESS,
  UPDATE_BOARD_SUCCESS,
  DELETE_BOARD_SUCCESS,

  // COLUMN
  ADD_COLUMN_SUCCESS,
  UPDATE_COLUMN_SUCCESS,
  DELETE_COLUMN_SUCCESS,

  // TASK
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from './actionTypes'
import { boardSchema, boardListSchema } from './schemas'

import { selectBoardById } from './boards/selectors'
import { selectColumnById } from './columns/selectors'
import { selectTaskById } from './tasks/selectors'

const ENTITY_KEYS = ['boards', 'columns', 'tasks']

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
    update('allIds', allIds =>
      without(allIds, ...entityIds.map(entityId => entityId.toString()))
    ),
    update('byId', byId => omit(byId, entityIds))
  )(store)

/**
 * Add normalized entities to store
 *
 * @param {Object} normalizedEntities - Normalized Entities Map
 * @param {Object} store - Redux store
 *
 * @returns {Object} - Updated store
 */
const addNormalizedEntitiesToStore = normalizedEntities => store => {
  const entitiesMap = pick(normalizedEntities, ENTITY_KEYS)
  const updates = Object.keys(entitiesMap).map(entityKey =>
    update(entityKey, entities =>
      addEntitiesToStore(entities, entitiesMap[entityKey])
    )
  )

  return flow(...updates)(store)
}

/**
 * Delete task deeply. It works as following:
 *  - Delete the task given from parent column
 *  - Delete the task given
 *
 * @param {number} taskId - Task Id
 * @param {Object} store - Redux store
 *
 * @returns {Object} - Updated store
 */
const deleteTaskDeep = taskId => store => {
  const task = selectTaskById(store, taskId)

  if (!task) {
    return store
  }

  return flow(
    // Delete task from parent column
    update(['columns', 'byId', task.column_id, 'tasks'], columnTasks =>
      without(columnTasks, task.id)
    ),

    // Delete task
    update('tasks', tasks => deleteEntitiesFromStore(tasks, [task.id]))
  )(store)
}

/**
 * Delete column deeply. It works as following:
 *  - Delete tasks that belong to the column given
 *  - Delete the column given from parent board
 *  - Delete the column given
 *
 * @param {number} columnId - Column Id
 * @param {Object} store - Redux store
 *
 * @returns {Object} - Updated store
 */
const deleteColumnDeep = columnId => store => {
  const column = selectColumnById(store, columnId)

  if (!column) {
    return store
  }

  return flow(
    // Delete tasks deeply
    ...column.tasks.map(taskId => deleteTaskDeep(taskId)),

    // Delete column from parent board
    update(['boards', 'byId', column.board_id, 'columns'], boardColumns =>
      without(boardColumns, column.id)
    ),

    // Delete column
    update('columns', columns => deleteEntitiesFromStore(columns, [column.id]))
  )(store)
}

/**
 * Delete board deeply. It works as following:
 *  - Delete columns deeply that belongs to the board given
 *  - Delete the board given
 *
 * @param {number} boardId - Board Id
 * @param {Object} store - Redux store
 *
 * @returns {Object} - Updated store
 */
const deleteBoardDeep = boardId => store => {
  const board = selectBoardById(store, boardId)

  if (!board) {
    return store
  }

  return flow(
    // Delete columns deeply
    ...board.columns.map(columnId => deleteColumnDeep(columnId)),

    // Delete board
    update('boards', boards => deleteEntitiesFromStore(boards, [boardId]))
  )(store)
}

export default handleActions(
  {
    [LOAD_BOARDS_REQUEST](state) {
      return set('loading', true)(state)
    },

    [LOAD_BOARDS_SUCCESS](state, action) {
      const normalizedData = normalize(action.payload, boardListSchema)

      return flow(
        set('loading', false),
        addNormalizedEntitiesToStore(normalizedData.entities)
      )(state)
    },

    [LOAD_BOARDS_FAILURE](state, action) {
      return set('loading', false)(state)
    },

    [LOAD_BOARD_SUCCESS](state, action) {
      const normalizedData = normalize(action.payload, boardSchema)

      return flow(
        set('loading', false),
        addNormalizedEntitiesToStore(normalizedData.entities)
      )(state)
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
        // Add column
        update('columns', columns =>
          addEntitiesToStore(columns, {
            [newColumn.id]: newColumn,
          })
        ),

        // Add column Id to parent board
        update(
          ['boards', 'byId', newColumn.board_id, 'columns'],
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

    [ADD_TASK_SUCCESS](state, action) {
      const newTask = action.payload

      return flow(
        // Add task
        update('tasks', tasks =>
          addEntitiesToStore(tasks, {
            [newTask.id]: newTask,
          })
        ),

        // Add task Id to parent column
        update(['columns', 'byId', newTask.column_id, 'tasks'], columnTasks =>
          columnTasks.concat(newTask.id)
        )
      )(state)
    },

    [UPDATE_TASK_SUCCESS](state, action) {
      const updatedTask = action.payload

      return update(['tasks', 'byId', updatedTask.id], task =>
        Object.assign({}, task, updatedTask)
      )(state)
    },

    [DELETE_TASK_SUCCESS](state, action) {
      const taskId = action.payload

      return deleteTaskDeep(taskId)(state)
    },
  },
  initialState
)
