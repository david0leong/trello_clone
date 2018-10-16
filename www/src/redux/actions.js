import { createAction } from 'redux-actions'

import {
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_FAILURE,
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
} from './actionTypes'

export const loadBoardsRequest = createAction(LOAD_BOARDS_REQUEST)
export const loadBoardsSuccess = createAction(LOAD_BOARDS_SUCCESS)
export const loadBoardsFailure = createAction(LOAD_BOARDS_FAILURE)

export const addBoardRequest = createAction(ADD_BOARD_REQUEST)
export const addBoardSuccess = createAction(ADD_BOARD_SUCCESS)
export const addBoardFailure = createAction(ADD_BOARD_FAILURE)

export const updateBoardRequest = createAction(UPDATE_BOARD_REQUEST)
export const updateBoardSuccess = createAction(UPDATE_BOARD_SUCCESS)
export const updateBoardFailure = createAction(UPDATE_BOARD_FAILURE)

export const deleteBoardRequest = createAction(DELETE_BOARD_REQUEST)
export const deleteBoardSuccess = createAction(DELETE_BOARD_SUCCESS)
export const deleteBoardFailure = createAction(DELETE_BOARD_FAILURE)
