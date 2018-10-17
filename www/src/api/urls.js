/**
 * API URL endpoints
 */

export default {
  base: `http://localhost:3000/`,
  board: {
    list: () => `boards`,
    listNested: () => `boards?nested`,
    detail: id => `boards/${id}/`,
    columns: {
      list: id => `boards/${id}/columns/`,
      listNested: id => `boards/${id}/columns?nested`,
    },
  },
  columns: {
    detail: id => `columns/${id}`,
  },
}
