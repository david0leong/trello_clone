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
} from './actionTypes'
import { boardListSchema } from './schemas'

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

export default handleActions(
  {
    [LOAD_BOARDS_REQUEST](state) {
      return set('loading', true)(state)
    },

    [LOAD_BOARDS_SUCCESS](state, action) {
      const normalizedData = normalize(action.payload, boardListSchema)

      return flow(
        set('loading', false),
        update('boards', boards =>
          addEntitiesToStore(boards, normalizedData.entities.boards)
        ),
        update('columns', columns =>
          addEntitiesToStore(columns, normalizedData.entities.columns)
        ),
        update('tasks', tasks =>
          addEntitiesToStore(tasks, normalizedData.entities.tasks)
        )
      )(state)
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

      return set(['boards', 'byId', updatedBoard.id], updatedBoard)(state)
    },

    [DELETE_BOARD_SUCCESS](state, action) {
      const id = action.payload

      return update('boards', boards => deleteEntitiesFromStore(boards, [id]))(
        state
      )
    },
  },
  initialState
)
