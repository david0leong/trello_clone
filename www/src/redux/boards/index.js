import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import set from 'lodash/fp/set'

import { LOAD_BOARDS } from './actionTypes'
import { boardSchema } from './schemas'

const initialState = {
  boards: {
    byId: {},
    allIds: [],
  },
}

export default handleActions(
  {
    [LOAD_BOARDS](state, action) {
      const normalizedData = normalize(action.payload, boardSchema)

      return set('boards', {
        byId: normalizedData.entities.boards,
        allIds: normalizedData.result,
      })(state)
    },
  },
  initialState
)
