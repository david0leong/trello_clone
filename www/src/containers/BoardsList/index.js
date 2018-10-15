import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'antd'

import { getBoards, getBoardsLoading } from '../../redux/boards/selectors'
import { loadBoardsRequest } from '../../redux/boards/actions'

class BoardsList extends React.Component {
  componentDidMount() {
    this.props.loadBoardsRequest()
  }

  render() {
    const { boards, loading } = this.props

    return (
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
    )
  }
}

const mapStateToProps = state => ({
  loading: getBoardsLoading(state),
  boards: getBoards(state),
})

const mapDispatchToProps = {
  loadBoardsRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList)
