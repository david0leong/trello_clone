const BoardAPI = {
  boards: [
    { id: 1, name: 'Board 1', title: 'Board 1' },
    { id: 2, name: 'Board 2', title: 'Board 2' },
    { id: 3, name: 'Board 3', title: 'Board 3' },
    { id: 4, name: 'Board 4', title: 'Board 4' },
    { id: 5, name: 'Board 5', title: 'Board 5' },
    { id: 6, name: 'Board 6', title: 'Board 6' },
  ],

  all: function() {
    return this.boards
  },

  get: function(id) {
    return this.boards.find(b => b.id === id)
  },
}

export default BoardAPI
