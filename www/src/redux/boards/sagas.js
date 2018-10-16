import { all, takeLatest, call, put } from 'redux-saga/effects'

import { getBoards, addBoard } from '../../api'
import {
  loadBoardsRequest,
  loadBoardsSuccess,
  loadBoardsFailure,
  addBoardRequest,
  addBoardSuccess,
  addBoardFailure,
} from './actions'

// Workers
export function* loadBoardsSaga() {
  try {
    const response = yield call(getBoards)

    yield put(loadBoardsSuccess(response.data))
  } catch (err) {
    console.log('Error in getting boards', err)
    yield put(loadBoardsFailure(err))
  }
}

export function* addBoardSaga(action) {
  try {
    const response = yield call(addBoard, action.payload)

    yield put(addBoardSuccess(response.data))
  } catch (err) {
    yield put(addBoardFailure(err))
  }
}

// Watcher
export default function* boardsSaga() {
  yield all([
    takeLatest(loadBoardsRequest.toString(), loadBoardsSaga),
    takeLatest(addBoardRequest.toString(), addBoardSaga),
  ])
}
