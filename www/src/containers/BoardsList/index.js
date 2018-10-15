import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'antd'

import { loadBoardsRequest } from '../../redux/boards/actions'
import { getBoards } from '../../redux/boards/selectors'

class BoardsList extends React.Component {
  componentDidMount() {
    this.props.loadBoardsRequest()
  }

  render() {
    const { boards } = this.props

    return (
      <List
        bordered
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
  boards: getBoards(state),
})

const mapDispatchToProps = {
  loadBoardsRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList)
