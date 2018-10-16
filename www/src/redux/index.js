import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import flow from 'lodash/fp/flow'
import set from 'lodash/fp/set'
import pull from 'lodash/fp/pull'

import {
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_FAILURE,
  ADD_BOARD_SUCCESS,
  UPDATE_BOARD_SUCCESS,
  DELETE_BOARD_SUCCESS,
} from './actionTypes'
import { boardListSchema } from './schemas'

const initialState = {
  loading: false,
  boards: {
    byId: {},
    allIds: [],
  },
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
        set('boards', {
          byId: normalizedData.entities.boards,
          allIds: normalizedData.result,
        })
      )(state)
    },

    [LOAD_BOARDS_FAILURE](state, action) {
      return set('loading', false)(state)
    },

    [ADD_BOARD_SUCCESS](state, action) {
      const newBoard = action.payload

      return flow(
        set(['boards', 'allIds'], state.allIds.concat(newBoard.id)),
        set(['boards', 'byId', newBoard.id], newBoard)
      )(state)
    },

    [UPDATE_BOARD_SUCCESS](state, action) {
      const updatedBoard = action.payload

      return set(['boards', 'byId', updatedBoard.id], updatedBoard)(state)
    },

    [DELETE_BOARD_SUCCESS](state, action) {
      const id = action.payload

      return flow(
        set(['boards', 'allIds'], pull(id)(state.allIds)),
        set(['boards', 'byId', id], undefined)
      )(state)
    },
  },
  initialState
)
