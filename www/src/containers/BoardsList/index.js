import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List, Button, Icon } from 'antd'
import get from 'lodash/get'

import { getBoards, getBoardsLoading } from '../../redux/boards/selectors'
import {
  loadBoardsRequest,
  addBoardRequest,
  updateBoardRequest,
  deleteBoardRequest,
} from '../../redux/boards/actions'

import BoardEditModal from '../../components/BoardEditModal'

import './style.css'

class BoardsList extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,

    loadBoardsRequest: PropTypes.func.isRequired,
    addBoardRequest: PropTypes.func.isRequired,
    updateBoardRequest: PropTypes.func.isRequired,
    deleteBoardRequest: PropTypes.func.isRequired,
  }

  state = {
    boardModalVisible: false,
    boardInEdit: null,
  }

  componentDidMount() {
    this.props.loadBoardsRequest()
  }

  showBoardModal = board => () => {
    this.setState({
      boardModalVisible: true,
      boardInEdit: board,
    })
  }

  handleBoardModalSubmit = values => {
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
      boardModalVisible: false,
      boardInEdit: null,
    })
  }

  handleBoardModalCancel = () => {
    this.setState({
      boardModalVisible: false,
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
    const { boardModalVisible, boardInEdit } = this.state

    return (
      <div>
        <Button
          type="primary"
          className="btn-add-board"
          onClick={this.showBoardModal(null)}
        >
          <Icon type="plus" /> Add Board
        </Button>

        <List
          bordered
          loading={loading}
          dataSource={boards}
          renderItem={board => (
            <List.Item
              actions={[
                <Button onClick={this.showBoardModal(board)}>
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
          visible={boardModalVisible}
          boardInEdit={boardInEdit}
          onSubmit={this.handleBoardModalSubmit}
          onCancel={this.handleBoardModalCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: getBoardsLoading(state),
  boards: getBoards(state),
})

const mapDispatchToProps = {
  loadBoardsRequest,
  addBoardRequest,
  updateBoardRequest,
  deleteBoardRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList)
