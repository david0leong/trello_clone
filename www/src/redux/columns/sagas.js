import { all, takeLatest, call, put } from 'redux-saga/effects'

import { addColumn, updateColumn, moveColumn, deleteColumn } from '../../api'
import { apiSaga } from '../common/sagas'
import {
  loadBoardRequest,
  addColumnRequest,
  addColumnSuccess,
  addColumnFailure,
  updateColumnRequest,
  updateColumnSuccess,
  updateColumnFailure,
  moveColumnRequest,
  moveColumnSuccess,
  moveColumnFailure,
  deleteColumnRequest,
  deleteColumnSuccess,
  deleteColumnFailure,
} from '../actions'

// Workers
export function* addColumnSaga(action) {
  const { boardId, params } = action.payload

  yield call(
    apiSaga,
    addColumnSuccess,
    addColumnFailure,
    addColumn,
    boardId,
    params
  )
}

export function* updateColumnSaga(action) {
  const { id, params } = action.payload

  yield call(
    apiSaga,
    updateColumnSuccess,
    updateColumnFailure,
    updateColumn,
    id,
    params
  )
}

export function* moveColumnSaga(action) {
  const { id, params } = action.payload

  try {
    const response = yield call(moveColumn, id, params)
    const column = response.data

    // Reload parent board
    yield put.resolve(loadBoardRequest(column.board_id))

    yield put(moveColumnSuccess(id))
  } catch (err) {
    yield put(moveColumnFailure(err))
  }
}

export function* deleteColumnSaga(action) {
  const id = action.payload

  try {
    yield call(deleteColumn, id)
    yield put(deleteColumnSuccess(id))
  } catch (err) {
    yield put(deleteColumnFailure(err))
  }
}

// Watcher
export default function* columnsSaga() {
  yield all([
    takeLatest(addColumnRequest.toString(), addColumnSaga),
    takeLatest(updateColumnRequest.toString(), updateColumnSaga),
    takeLatest(moveColumnRequest.toString(), moveColumnSaga),
    takeLatest(deleteColumnRequest.toString(), deleteColumnSaga),
  ])
}
