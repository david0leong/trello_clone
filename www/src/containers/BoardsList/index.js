import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getBoards } from '../../redux/boards/selectors'

const BoardsList = ({ boards }) => (
  <div>
    <ul>
      {boards.map(b => (
        <li key={b.number}>
          <Link to={`/boards/${b.id}`}>{b.name}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const mapStateToProps = state => ({
  boards: getBoards(state),
})

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList)
