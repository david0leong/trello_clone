import { createAction } from 'redux-actions'

import {
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_FAILURE,
} from './actionTypes'

export const loadBoardsRequest = createAction(LOAD_BOARDS_REQUEST)
export const loadBoardsSuccess = createAction(LOAD_BOARDS_SUCCESS)
export const loadBoardsFailure = createAction(LOAD_BOARDS_FAILURE)
