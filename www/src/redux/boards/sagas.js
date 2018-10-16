import { all, takeLatest, call, put } from 'redux-saga/effects'

import { getBoards, addBoard, updateBoard, deleteBoard } from '../../api'
import { apiSaga } from '../common/sagas'
import {
  loadBoardsRequest,
  loadBoardsSuccess,
  loadBoardsFailure,
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

export function* addBoardSaga(action) {
  yield call(
    apiSaga,
    addBoardSuccess,
    addBoardFailure,
    addBoard,
    action.payload
  )
}

export function* updateBoardSaga(action) {
  const { id, params } = action.payload

  yield call(
    apiSaga,
    updateBoardSuccess,
    updateBoardFailure,
    updateBoard,
    id,
    params
  )
}

export function* deleteBoardSaga(action) {
  const id = action.payload

  try {
    yield call(deleteBoard, id)
    yield put(deleteBoardSuccess(id))
  } catch (err) {
    yield put(deleteBoardFailure(err))
  }
}

// Watcher
export default function* boardsSaga() {
  yield all([
    takeLatest(loadBoardsRequest.toString(), loadBoardsSaga),
    takeLatest(addBoardRequest.toString(), addBoardSaga),
    takeLatest(updateBoardRequest.toString(), updateBoardSaga),
    takeLatest(deleteBoardRequest.toString(), deleteBoardSaga),
  ])
}
