import { all, takeLatest, call, put } from 'redux-saga/effects'

import { updateColumn, deleteColumn } from '../../api'
import { apiSaga } from '../common/sagas'
import {
  updateColumnRequest,
  updateColumnSuccess,
  updateColumnFailure,
  deleteColumnRequest,
  deleteColumnSuccess,
  deleteColumnFailure,
} from '../actions'

// Workers
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
    takeLatest(updateColumnRequest.toString(), updateColumnSaga),
    takeLatest(deleteColumnRequest.toString(), deleteColumnSaga),
  ])
}
