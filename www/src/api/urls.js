/**
 * API URL endpoints
 */

export default {
  base: `http://localhost:3000/`,
  board: {
    list: () => `boards`,
    listNested: () => `boards?nested`,
    detail: boardId => `boards/${boardId}`,
    column: {
      list: boardId => `boards/${boardId}/columns`,
      listNested: boardId => `boards/${boardId}/columns?nested`,
    },
  },
  column: {
    detail: columnId => `columns/${columnId}`,
  },
}
