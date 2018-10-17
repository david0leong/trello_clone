import axios from 'axios'

import urls from './urls'

const axiosClient = axios.create({
  baseURL: urls.base,
  headers: {
    'Content-Type': 'application/json',
  },
})

// BOARD
export const getBoards = () => axiosClient.get(urls.board.listNested())

export const getBoard = boardId =>
  axiosClient.get(urls.board.detailNested(boardId))

export const addBoard = ({ name, title }) =>
  axiosClient.post(urls.board.list(), { name, title })

export const updateBoard = (boardId, { name, title }) =>
  axiosClient.patch(urls.board.detail(boardId), { name, title })

export const deleteBoard = boardId =>
  axiosClient.delete(urls.board.detail(boardId))

// COLUMN
export const addColumn = (boardId, { name, title }) =>
  axiosClient.post(urls.board.column.list(boardId), { name, title })

export const updateColumn = (columnId, { name, title }) =>
  axiosClient.patch(urls.column.detail(columnId), { name, title })

export const moveColumn = (columnId, { position }) =>
  axiosClient.patch(urls.column.detail(columnId), { position })

export const deleteColumn = columnId =>
  axiosClient.delete(urls.column.detail(columnId))

// TASK
export const addTask = (columnId, { name, title }) =>
  axiosClient.post(urls.column.task.list(columnId), { name, title })

export const moveTask = (taskId, { column_id, position }) =>
  axiosClient.patch(urls.task.detail(taskId), { column_id, position })

export const updateTask = (taskId, { name, title }) =>
  axiosClient.patch(urls.task.detail(taskId), { name, title })

export const deleteTask = taskId => axiosClient.delete(urls.task.detail(taskId))
