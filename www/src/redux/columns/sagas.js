import { all, takeLatest, call, put } from 'redux-saga/effects'

import { addColumn, updateColumn, deleteColumn } from '../../api'
import { apiSaga } from '../common/sagas'
import {
  addColumnRequest,
  addColumnSuccess,
  addColumnFailure,
  updateColumnRequest,
  updateColumnSuccess,
  updateColumnFailure,
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
    takeLatest(deleteColumnRequest.toString(), deleteColumnSaga),
  ])
}
