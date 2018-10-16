import { all, takeLatest, call } from 'redux-saga/effects'

import { getBoards, addBoard, updateBoard } from '../../api'
import apiSaga from '../common/saga'
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
} from './actions'

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

// Watcher
export default function* boardsSaga() {
  yield all([
    takeLatest(loadBoardsRequest.toString(), loadBoardsSaga),
    takeLatest(addBoardRequest.toString(), addBoardSaga),
    takeLatest(updateBoardRequest.toString(), updateBoardSaga),
  ])
}
