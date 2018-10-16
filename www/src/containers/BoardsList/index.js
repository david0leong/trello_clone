import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List, Button } from 'antd'
import get from 'lodash/get'

import { getBoards, getBoardsLoading } from '../../redux/boards/selectors'
import {
  loadBoardsRequest,
  addBoardRequest,
  updateBoardRequest,
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

  render() {
    const { boards, loading } = this.props
    const { boardModalVisible, boardInEdit } = this.state

    return (
      <div>
        <List
          bordered
          loading={loading}
          dataSource={boards}
          renderItem={board => (
            <List.Item
              actions={[
                <a href="#" onClick={this.showBoardModal(board)}>
                  Edit
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<Link to={`/boards/${board.id}`}>{board.name}</Link>}
                description={board.title}
              />
            </List.Item>
          )}
        />

        <Button
          type="primary"
          className="btn-add-board"
          onClick={this.showBoardModal(null)}
        >
          Add Board +
        </Button>

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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList)
