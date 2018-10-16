import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List, Button } from 'antd'

import { getBoards, getBoardsLoading } from '../../redux/boards/selectors'
import { loadBoardsRequest, addBoardRequest } from '../../redux/boards/actions'

import BoardEditModal from '../../components/BoardEditModal'

import './style.css'

class BoardsList extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,

    loadBoardsRequest: PropTypes.func.isRequired,
    addBoardRequest: PropTypes.func.isRequired,
  }

  state = { addBoardModalVisible: false }

  componentDidMount() {
    this.props.loadBoardsRequest()
  }

  showAddBoardModal = () => {
    this.setState({
      addBoardModalVisible: true,
    })
  }

  handleAddBoardSubmit = values => {
    const { addBoardRequest } = this.props

    this.setState({
      addBoardModalVisible: false,
    })

    addBoardRequest(values)
  }

  handleAddBoardCancel = () => {
    this.setState({
      addBoardModalVisible: false,
    })
  }

  render() {
    const { boards, loading } = this.props
    const { addBoardModalVisible } = this.state

    return (
      <div>
        <List
          bordered
          loading={loading}
          dataSource={boards}
          renderItem={board => (
            <List.Item>
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
          onClick={this.showAddBoardModal}
        >
          Add Board +
        </Button>

        <BoardEditModal
          visible={addBoardModalVisible}
          onSubmit={this.handleAddBoardSubmit}
          onCancel={this.handleAddBoardCancel}
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList)
