import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { selectBoardById } from '../../redux/boards/selectors'

class Board extends React.Component {
  static propTypes = {
    board: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const { board } = this.props

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
}

const mapStateToProps = (state, props) => ({
  board: selectBoardById(state, props.match.params.boardId),
  columns: [],
})

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
