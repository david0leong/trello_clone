import React from 'react'
import { Link } from 'react-router-dom'

import BoardAPI from '../../utils/api'

const BoardsList = () => (
  <div>
    <ul>
      {BoardAPI.all().map(b => (
        <li key={b.number}>
          <Link to={`/boards/${b.id}`}>{b.name}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default BoardsList
