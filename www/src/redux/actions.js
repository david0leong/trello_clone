import { createAction } from 'redux-actions'

import {
  // BOARD
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_FAILURE,
  LOAD_BOARD_REQUEST,
  LOAD_BOARD_SUCCESS,
  LOAD_BOARD_FAILURE,
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,

  // COLUMN
  ADD_COLUMN_REQUEST,
  ADD_COLUMN_SUCCESS,
  ADD_COLUMN_FAILURE,
  MOVE_COLUMN_REQUEST,
  MOVE_COLUMN_SUCCESS,
  MOVE_COLUMN_FAILURE,
  UPDATE_COLUMN_REQUEST,
  UPDATE_COLUMN_SUCCESS,
  UPDATE_COLUMN_FAILURE,
  DELETE_COLUMN_REQUEST,
  DELETE_COLUMN_SUCCESS,
  DELETE_COLUMN_FAILURE,

  // TASK
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from './actionTypes'

// BOARD
export const loadBoardsRequest = createAction(LOAD_BOARDS_REQUEST)
export const loadBoardsSuccess = createAction(LOAD_BOARDS_SUCCESS)
export const loadBoardsFailure = createAction(LOAD_BOARDS_FAILURE)

export const loadBoardRequest = createAction(LOAD_BOARD_REQUEST)
export const loadBoardSuccess = createAction(LOAD_BOARD_SUCCESS)
export const loadBoardFailure = createAction(LOAD_BOARD_FAILURE)

export const addBoardRequest = createAction(ADD_BOARD_REQUEST)
export const addBoardSuccess = createAction(ADD_BOARD_SUCCESS)
export const addBoardFailure = createAction(ADD_BOARD_FAILURE)

export const updateBoardRequest = createAction(UPDATE_BOARD_REQUEST)
export const updateBoardSuccess = createAction(UPDATE_BOARD_SUCCESS)
export const updateBoardFailure = createAction(UPDATE_BOARD_FAILURE)

export const deleteBoardRequest = createAction(DELETE_BOARD_REQUEST)
export const deleteBoardSuccess = createAction(DELETE_BOARD_SUCCESS)
export const deleteBoardFailure = createAction(DELETE_BOARD_FAILURE)

// COLUMN
export const addColumnRequest = createAction(ADD_COLUMN_REQUEST)
export const addColumnSuccess = createAction(ADD_COLUMN_SUCCESS)
export const addColumnFailure = createAction(ADD_COLUMN_FAILURE)

export const updateColumnRequest = createAction(UPDATE_COLUMN_REQUEST)
export const updateColumnSuccess = createAction(UPDATE_COLUMN_SUCCESS)
export const updateColumnFailure = createAction(UPDATE_COLUMN_FAILURE)

export const moveColumnRequest = createAction(MOVE_COLUMN_REQUEST)
export const moveColumnSuccess = createAction(MOVE_COLUMN_SUCCESS)
export const moveColumnFailure = createAction(MOVE_COLUMN_FAILURE)

export const deleteColumnRequest = createAction(DELETE_COLUMN_REQUEST)
export const deleteColumnSuccess = createAction(DELETE_COLUMN_SUCCESS)
export const deleteColumnFailure = createAction(DELETE_COLUMN_FAILURE)

// TASK
export const addTaskRequest = createAction(ADD_TASK_REQUEST)
export const addTaskSuccess = createAction(ADD_TASK_SUCCESS)
export const addTaskFailure = createAction(ADD_TASK_FAILURE)

export const updateTaskRequest = createAction(UPDATE_TASK_REQUEST)
export const updateTaskSuccess = createAction(UPDATE_TASK_SUCCESS)
export const updateTaskFailure = createAction(UPDATE_TASK_FAILURE)

export const deleteTaskRequest = createAction(DELETE_TASK_REQUEST)
export const deleteTaskSuccess = createAction(DELETE_TASK_SUCCESS)
export const deleteTaskFailure = createAction(DELETE_TASK_FAILURE)
