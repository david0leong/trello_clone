/**
 * API URL endpoints
 */

export default {
  base: `http://localhost:3000/`,
  board: {
    list: () => `boards/`,
    detail: id => `boards/${id}/`,
    columns: id => `boards/${id}/columns/`,
  },
  columns: {
    detail: id => `columns/${id}`,
  },
}
