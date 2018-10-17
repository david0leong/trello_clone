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

export const updateBoard = (id, params) =>
  axiosClient.patch(urls.board.detail(id), params)

export const deleteBoard = id => axiosClient.delete(urls.board.detail(id))
