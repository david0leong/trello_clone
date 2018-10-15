import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home'
import Boards from '../Boards'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/boards" component={Boards} />
    </Switch>
  </main>
)

export default Main
