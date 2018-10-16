import axios from 'axios'

import urls from './urls'

const axiosClient = axios.create({
  baseURL: urls.base,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getBoards = () => axiosClient.get(urls.boards.list())

export const addBoard = params => axiosClient.post(urls.boards.list(), params)

export const updateBoard = (id, params) =>
  axiosClient.patch(urls.boards.detail(id), params)

export const deleteBoard = id => axiosClient.delete(urls.boards.detail(id))
