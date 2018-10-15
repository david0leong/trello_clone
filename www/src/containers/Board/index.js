import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getBoardById } from '../../redux/boards/selectors'

const Board = ({ board }) => {
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

const mapStateToProps = (state, props) => ({
  board: getBoardById(state, props.match.params.id),
})

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
