import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Icon } from 'antd'

import { selectNestedBoardById } from '../../redux/boards/selectors'
import {
  addColumnRequest,
  updateColumnRequest,
  deleteColumnRequest,
} from '../../redux/actions'

import Column from '../../components/Column'
import ColumnEditModal from '../../components/ColumnEditModal'

import './style.css'

class Board extends React.Component {
  static propTypes = {
    board: PropTypes.object,

    addColumnRequest: PropTypes.func.isRequired,
    updateColumnRequest: PropTypes.func.isRequired,
    deleteColumnRequest: PropTypes.func.isRequired,
  }

  state = {
    editModalVisible: false,
  }

  handleAddColumn = () => {
    this.setState({
      editModalVisible: true,
    })
  }

  handleEditModalSubmit = values => {
    const { board, addColumnRequest } = this.props

    addColumnRequest({
      boardId: board.id,
      params: values,
    })

    this.setState({
      editModalVisible: false,
    })
  }

  handleEditModalCancel = () => {
    this.setState({
      editModalVisible: false,
    })
  }

  handleUpdateColumn = column => values => {
    const { updateColumnRequest } = this.props

    updateColumnRequest({
      id: column.id,
      params: values,
    })
  }

  handleMoveColumn = column => position => {
    // TODO: Handle moving column
  }

  handleDeleteColumn = column => () => {
    const { deleteColumnRequest } = this.props

    deleteColumnRequest(column.id)
  }

  render() {
    const { board } = this.props
    const { editModalVisible } = this.state

    if (!board) {
      return <div>Sorry, but the board was not found</div>
    }

    return (
      <div className="board-container">
        <div className="board-header">
          <Breadcrumb className="board-breadcrumb">
            <Breadcrumb.Item>
              <Link to="/boards">Boards</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{board.title}</Breadcrumb.Item>
          </Breadcrumb>

          <Button
            type="primary"
            className="btn-add-column"
            onClick={this.handleAddColumn}
          >
            <Icon type="plus" /> Add Column
          </Button>
        </div>

        <div className="columns-container">
          {board.columns.map(column => (
            <Column
              key={column.id}
              column={column}
              onUpdate={this.handleUpdateColumn(column)}
              onMove={this.handleMoveColumn(column)}
              onDelete={this.handleDeleteColumn(column)}
            />
          ))}
        </div>

        <ColumnEditModal
          key="new"
          visible={editModalVisible}
          columnInEdit={null}
          onSubmit={this.handleEditModalSubmit}
          onCancel={this.handleEditModalCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { boardId } = props.match.params

  return {
    board: selectNestedBoardById(state, boardId),
  }
}

const mapDispatchToProps = {
  addColumnRequest,
  updateColumnRequest,
  deleteColumnRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
