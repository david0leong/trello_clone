import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import flow from 'lodash/fp/flow'
import set from 'lodash/fp/set'

import { LOAD_BOARDS_SUCCESS } from './actionTypes'
import { boardListSchema } from './schemas'

const initialState = {
  byId: {},
  allIds: [],
}

export default handleActions(
  {
    [LOAD_BOARDS_SUCCESS](state, action) {
      const normalizedData = normalize(action.payload, boardListSchema)

      return flow(
        set('byId', normalizedData.entities.boards),
        set('allIds', normalizedData.result)
      )(state)
    },
  },
  initialState
)
