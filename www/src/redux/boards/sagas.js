import { all, takeLatest, call, put } from 'redux-saga/effects'

import {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from '../../api'
import { apiSaga } from '../common/sagas'
import {
  loadBoardsRequest,
  loadBoardsSuccess,
  loadBoardsFailure,
  loadBoardRequest,
  loadBoardSuccess,
  loadBoardFailure,
  addBoardRequest,
  addBoardSuccess,
  addBoardFailure,
  updateBoardRequest,
  updateBoardSuccess,
  updateBoardFailure,
  deleteBoardRequest,
  deleteBoardSuccess,
  deleteBoardFailure,
} from '../actions'

// Workers
export function* loadBoardsSaga() {
  yield call(apiSaga, loadBoardsSuccess, loadBoardsFailure, getBoards)
}

export function* loadBoardSaga(action) {
  const boardId = action.payload

  yield call(apiSaga, loadBoardSuccess, loadBoardFailure, getBoard, boardId)
}

export function* addBoardSaga(action) {
  const params = action.payload

  yield call(apiSaga, addBoardSuccess, addBoardFailure, addBoard, params)
}

export function* updateBoardSaga(action) {
  const { boardId, params } = action.payload

  yield call(
    apiSaga,
    updateBoardSuccess,
    updateBoardFailure,
    updateBoard,
    boardId,
    params
  )
}

export function* deleteBoardSaga(action) {
  const boardId = action.payload

  try {
    yield call(deleteBoard, boardId)
    yield put(deleteBoardSuccess(boardId))
  } catch (err) {
    yield put(deleteBoardFailure(err))
  }
}

// Watcher
export default function* boardsSaga() {
  yield all([
    takeLatest(loadBoardsRequest.toString(), loadBoardsSaga),
    takeLatest(loadBoardRequest.toString(), loadBoardSaga),
    takeLatest(addBoardRequest.toString(), addBoardSaga),
    takeLatest(updateBoardRequest.toString(), updateBoardSaga),
    takeLatest(deleteBoardRequest.toString(), deleteBoardSaga),
  ])
}
