import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Icon } from 'antd'
import get from 'lodash/get'

import { selectNestedBoardById } from '../../redux/boards/selectors'
import {
  addColumnRequest,
  updateColumnRequest,
  deleteColumnRequest,
} from '../../redux/actions'

import Column from '../Column'
import ColumnEditModal from '../../components/ColumnEditModal'
import ColumnMoveModal from '../../components/ColumnMoveModal'

import './style.css'

class Board extends React.Component {
  static propTypes = {
    board: PropTypes.object,

    addColumnRequest: PropTypes.func.isRequired,
    updateColumnRequest: PropTypes.func.isRequired,
    deleteColumnRequest: PropTypes.func.isRequired,
  }

  state = {
    columnEditModalVisible: false,
    columnInEdit: null,

    columnMoveModalVisible: false,
    columnInMove: null,
  }

  showColumnEditModal = column => () => {
    this.setState({
      columnEditModalVisible: true,
      columnInEdit: column,
    })
  }

  handleColumnEditModalSubmit = values => {
    const { board, addColumnRequest, updateColumnRequest } = this.props
    const { columnInEdit } = this.state

    if (columnInEdit) {
      updateColumnRequest({
        id: columnInEdit.id,
        params: values,
      })
    } else {
      addColumnRequest({
        boardId: board.id,
        params: values,
      })
    }

    this.setState({
      columnEditModalVisible: false,
      columnInEdit: null,
    })
  }

  handleColumnEditModalCancel = () => {
    this.setState({
      columnEditModalVisible: false,
      columnInEdit: null,
    })
  }

  showColumnMoveModal = column => () => {
    if (column) {
      this.setState({
        columnMoveModalVisible: true,
        columnInMove: column,
      })
    }
  }

  handleColumnMoveModalSubmit = values => {
    const { moveColumnRequest } = this.props
    const { columnInMove } = this.state

    if (!columnInMove) {
      return
    }

    moveColumnRequest({
      id: columnInMove.id,
      params: values,
    })

    this.setState({
      columnMoveModalVisible: false,
      columnInMove: null,
    })
  }

  handleColumnMoveModalCancel = () => {
    this.setState({
      columnMoveModalVisible: false,
      columnInMove: null,
    })
  }

  handleDeleteColumn = column => () => {
    const { deleteColumnRequest } = this.props

    if (window.confirm('Are you sure to remove this column?')) {
      deleteColumnRequest(column.id)
    }
  }

  render() {
    const { board } = this.props
    const {
      columnEditModalVisible,
      columnInEdit,
      columnMoveModalVisible,
      columnInMove,
    } = this.state

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
            onClick={this.showColumnEditModal(null)}
          >
            <Icon type="plus" /> Add Column
          </Button>
        </div>

        <div className="columns-container">
          {board.columns.map(column => (
            <Column
              key={column.id}
              column={column}
              onEdit={this.showColumnEditModal(column)}
              onMove={this.showColumnMoveModal(column)}
              onDelete={this.handleDeleteColumn(column)}
            />
          ))}
        </div>

        <ColumnEditModal
          key={get(columnInEdit, 'id', 'new')}
          visible={columnEditModalVisible}
          defaultColumn={columnInEdit}
          onSubmit={this.handleColumnEditModalSubmit}
          onCancel={this.handleColumnEditModalCancel}
        />

        {columnInMove && (
          <ColumnMoveModal
            key={columnInMove.id}
            visible={columnMoveModalVisible}
            column={columnInMove}
            onSubmit={this.handleColumnMoveModalSubmit}
            onCancel={this.handleColumnMoveModalCancel}
          />
        )}
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
