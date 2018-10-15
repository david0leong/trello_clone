import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import flow from 'lodash/fp/flow'
import set from 'lodash/fp/set'

import {
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_FAILURE,
} from './actionTypes'
import { boardListSchema } from './schemas'

const initialState = {
  loading: false,
  byId: {},
  allIds: [],
}

export default handleActions(
  {
    [LOAD_BOARDS_REQUEST](state, action) {
      return set('loading', true)(state)
    },

    [LOAD_BOARDS_SUCCESS](state, action) {
      const normalizedData = normalize(action.payload, boardListSchema)

      return flow(
        set('loading', false),
        set('byId', normalizedData.entities.boards),
        set('allIds', normalizedData.result)
      )(state)
    },

    [LOAD_BOARDS_FAILURE](state, action) {
      return set('loading', false)(state)
    },
  },
  initialState
)
