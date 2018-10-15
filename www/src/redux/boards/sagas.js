import { all, takeLatest, call, put } from 'redux-saga/effects'

import { getBoards } from '../../api'
import {
  loadBoardsRequest,
  loadBoardsSuccess,
  loadBoardsFailure,
} from './actions'

// Workers
export function* loadBoardsSaga() {
  try {
    const boards = yield call(getBoards)

    yield put(loadBoardsSuccess(boards))
  } catch (err) {
    console.log('Error in getting boards', err)
    yield put(loadBoardsFailure(err))
  }
}

// Watcher
export default function* boardsSaga() {
  yield all([takeLatest(loadBoardsRequest.toString(), loadBoardsSaga)])
}
