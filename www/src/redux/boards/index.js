import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import flow from 'lodash/fp/flow'
import set from 'lodash/fp/set'

import { LOAD_BOARDS } from './actionTypes'
import { boardSchema } from './schemas'

const initialState = {
  byId: {},
  allIds: [],
}

export default handleActions(
  {
    [LOAD_BOARDS](state, action) {
      const normalizedData = normalize(action.payload, boardSchema)

      return flow(
        set('byId', normalizedData.entities.boards),
        set('allIds', normalizedData.result)
      )(state)
    },
  },
  initialState
)
