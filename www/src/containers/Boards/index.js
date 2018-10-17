import React from 'react'
import { Switch, Route } from 'react-router-dom'

import BoardsList from '../BoardsList'
import Board from '../Board'

const Boards = () => (
  <Switch>
    <Route exact path="/boards" component={BoardsList} />
    <Route path="/boards/:boardId" component={Board} />
  </Switch>
)

export default Boards
