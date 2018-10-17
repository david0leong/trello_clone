import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List, Button, Icon } from 'antd'
import get from 'lodash/get'

import { selectLoading } from '../../redux/selectors'
import { selectAllBoards } from '../../redux/boards/selectors'
import {
  addBoardRequest,
  updateBoardRequest,
  deleteBoardRequest,
} from '../../redux/actions'

import BoardEditModal from '../../components/BoardEditModal'

import './style.css'

class BoardsList extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,

    addBoardRequest: PropTypes.func.isRequired,
    updateBoardRequest: PropTypes.func.isRequired,
    deleteBoardRequest: PropTypes.func.isRequired,
  }

  state = {
    boardEditModalVisible: false,
    boardInEdit: null,
  }

  showBoardEditModal = board => () => {
    this.setState({
      boardEditModalVisible: true,
      boardInEdit: board,
    })
  }

  handleBoardEditModalSubmit = values => {
    const { addBoardRequest, updateBoardRequest } = this.props
    const { boardInEdit } = this.state

    if (boardInEdit) {
      updateBoardRequest({
        id: boardInEdit.id,
        params: values,
      })
    } else {
      addBoardRequest(values)
    }

    this.setState({
      boardEditModalVisible: false,
      boardInEdit: null,
    })
  }

  handleBoardEditModalCancel = () => {
    this.setState({
      boardEditModalVisible: false,
      boardInEdit: null,
    })
  }

  handleDeleteBoard = board => () => {
    const { deleteBoardRequest } = this.props

    if (window.confirm('Are you sure to remove this board?')) {
      deleteBoardRequest(board.id)
    }
  }

  render() {
    const { boards, loading } = this.props
    const { boardEditModalVisible, boardInEdit } = this.state

    return (
      <div>
        <Button
          type="primary"
          className="btn-add-board"
          onClick={this.showBoardEditModal(null)}
        >
          <Icon type="plus" /> Add Board
        </Button>

        <List
          className="boards-list"
          bordered
          loading={loading}
          dataSource={boards}
          renderItem={board => (
            <List.Item
              actions={[
                <Button onClick={this.showBoardEditModal(board)}>
                  <Icon type="edit" /> Edit
                </Button>,
                <Button type="danger" onClick={this.handleDeleteBoard(board)}>
                  <Icon type="delete" /> Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={<Link to={`/boards/${board.id}`}>{board.name}</Link>}
                description={board.title}
              />
            </List.Item>
          )}
        />

        <BoardEditModal
          key={get(boardInEdit, 'id', 'new')}
          visible={boardEditModalVisible}
          defaultModel={boardInEdit}
          onSubmit={this.handleBoardEditModalSubmit}
          onCancel={this.handleBoardEditModalCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: selectLoading(state),
  boards: selectAllBoards(state),
})

const mapDispatchToProps = {
  addBoardRequest,
  updateBoardRequest,
  deleteBoardRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList)
