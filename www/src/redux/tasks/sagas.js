import { all, takeLatest, call, put } from 'redux-saga/effects'

import { addTask, updateTask, deleteTask } from '../../api'
import { apiSaga } from '../common/sagas'
import {
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from '../actions'

// Workers
export function* addTaskSaga(action) {
  const { columnId, params } = action.payload

  yield call(apiSaga, addTaskSuccess, addTaskFailure, addTask, columnId, params)
}

export function* updateTaskSaga(action) {
  const { id, params } = action.payload

  yield call(
    apiSaga,
    updateTaskSuccess,
    updateTaskFailure,
    updateTask,
    id,
    params
  )
}

export function* deleteTaskSaga(action) {
  const id = action.payload

  try {
    yield call(deleteTask, id)
    yield put(deleteTaskSuccess(id))
  } catch (err) {
    yield put(deleteTaskFailure(err))
  }
}

// Watcher
export default function* tasksSaga() {
  yield all([
    takeLatest(addTaskRequest.toString(), addTaskSaga),
    takeLatest(updateTaskRequest.toString(), updateTaskSaga),
    takeLatest(deleteTaskRequest.toString(), deleteTaskSaga),
  ])
}
