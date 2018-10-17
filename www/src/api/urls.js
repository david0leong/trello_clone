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
    },
  },

  column: {
    detail: columnId => `columns/${columnId}`,
    task: {
      list: columnId => `columns/${columnId}/tasks`,
    },
  },

  task: {
    detail: taskId => `tasks/${taskId}`,
  },
}
