import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { selectNestedBoardById } from '../../redux/boards/selectors'

class Board extends React.Component {
  static propTypes = {
    nestedBoard: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const { nestedBoard } = this.props

    if (!nestedBoard) {
      return <div>Sorry, but the board was not found</div>
    }

    return (
      <div>
        <h1>
          {nestedBoard.name} (#
          {nestedBoard.id})
        </h1>

        <h2>Title: {nestedBoard.title}</h2>

        <Link to="/boards">Back</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { boardId } = props.match.params

  return {
    nestedBoard: selectNestedBoardById(state, boardId),
  }
}

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
