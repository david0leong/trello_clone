import React from 'react'
import { Link } from 'react-router-dom'

import BoardAPI from '../../utils/api'

const Board = props => {
  const board = BoardAPI.get(parseInt(props.match.params.id, 10))

  if (!board) {
    return <div>Sorry, but the board was not found</div>
  }

  return (
    <div>
      <h1>
        {board.name} (#
        {board.id})
      </h1>

      <h2>Title: {board.title}</h2>

      <Link to="/boards">Back</Link>
    </div>
  )
}

export default Board
