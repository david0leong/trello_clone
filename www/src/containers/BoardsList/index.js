import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadBoardsRequest } from '../../redux/boards/actions'
import { getBoards } from '../../redux/boards/selectors'

class BoardsList extends React.Component {
  componentDidMount() {
    this.props.loadBoardsRequest()
  }

  render() {
    const { boards } = this.props

    return (
      <div>
        <ul>
          {boards.map(b => (
            <li key={b.id}>
              <Link to={`/boards/${b.id}`}>{b.name}</Link>
            </li>
          ))}
        </ul>
      </div>
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
