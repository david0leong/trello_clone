import axios from 'axios'

import urls from './urls'

const axiosClient = axios.create({
  baseURL: urls.base,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getBoards = () => axiosClient.get(urls.board.listNested())

export const addBoard = params => axiosClient.post(urls.board.list(), params)

export const updateBoard = (boardId, params) =>
  axiosClient.patch(urls.board.detail(boardId), params)

export const deleteBoard = boardId =>
  axiosClient.delete(urls.board.detail(boardId))

export const updateColumn = (columnId, params) =>
  axiosClient.patch(urls.column.detail(columnId), params)

export const deleteColumn = columnId =>
  axiosClient.delete(urls.column.detail(columnId))

export const addColumn = (boardId, params) =>
  axiosClient.post(urls.board.column.list(boardId), params)
