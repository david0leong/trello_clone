import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

class Task extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
  }

  render() {
    const { task } = this.props

    return <div className="task-container">{task.name}</div>
  }
}

export default Task
