import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd'

import { selectNestedBoardById } from '../../redux/boards/selectors'
import Column from '../../components/Column'

import './style.css'

class Board extends React.Component {
  static propTypes = {
    nestedBoard: PropTypes.object,
  }

  render() {
    const { nestedBoard } = this.props

    if (!nestedBoard) {
      return <div>Sorry, but the board was not found</div>
    }

    return (
      <div className="board-container">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/boards">Boards</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{nestedBoard.title}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="columns-container">
          {nestedBoard.columns.map(column => (
            <Column key={column.id} column={column} />
          ))}
        </div>
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
