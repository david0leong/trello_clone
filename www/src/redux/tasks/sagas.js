import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { addTask, updateTask, moveTask, deleteTask } from '../../api'
import { apiSaga } from '../common/sagas'
import {
  loadBoardRequest,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  moveTaskRequest,
  moveTaskSuccess,
  moveTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from '../actions'
import { selectColumnById } from '../columns/selectors'

// Workers
export function* addTaskSaga(action) {
  const { columnId, params } = action.payload

  yield call(apiSaga, addTaskSuccess, addTaskFailure, addTask, columnId, params)
}

export function* updateTaskSaga(action) {
  const { taskId, params } = action.payload

  yield call(
    apiSaga,
    updateTaskSuccess,
    updateTaskFailure,
    updateTask,
    taskId,
    params
  )
}

export function* moveTaskSaga(action) {
  const { taskId, params } = action.payload

  try {
    const response = yield call(moveTask, taskId, params)
    const task = response.data

    // Delete current task
    yield put.resolve(deleteTaskSuccess(taskId))

    // Reload parent board
    const column = yield select(selectColumnById, task.column_id)
    yield put.resolve(loadBoardRequest(column.board_id))

    yield put(moveTaskSuccess(taskId))
  } catch (err) {
    yield put(moveTaskFailure(err))
  }
}

export function* deleteTaskSaga(action) {
  const taskId = action.payload

  try {
    yield call(deleteTask, taskId)
    yield put(deleteTaskSuccess(taskId))
  } catch (err) {
    yield put(deleteTaskFailure(err))
  }
}

// Watcher
export default function* tasksSaga() {
  yield all([
    takeLatest(addTaskRequest.toString(), addTaskSaga),
    takeLatest(updateTaskRequest.toString(), updateTaskSaga),
    takeLatest(moveTaskRequest.toString(), moveTaskSaga),
    takeLatest(deleteTaskRequest.toString(), deleteTaskSaga),
  ])
}
