import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './style.css'

class Column extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
  }

  render() {
    const { column } = this.props

    return (
      <div className="column-container">
        <div className="column-header">{column.name}</div>

        <div className="tasks-container">
          {column.tasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    )
  }
}

export default Column
