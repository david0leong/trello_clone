import { createAction } from 'redux-actions'

import { LOAD_BOARDS } from './actionTypes'

export const loadBoards = createAction(LOAD_BOARDS)
