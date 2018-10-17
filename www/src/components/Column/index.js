/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from 'antd'

import Task from '../Task'

import './style.css'

class Column extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,

    onUpdate: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  handleEdit = () => {}
  handleMove = () => {}
  handleDelete = () => {}

  renderColumnMenu() {
    const menu = (
      <Menu>
        <Menu.Item key="edit">
          <a href="#" onClick={this.handleEdit}>
            Edit
          </a>
        </Menu.Item>

        <Menu.Item key="position">
          <a href="#" onClick={this.handleMove}>
            Move
          </a>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="delete">
          <a href="#" onClick={this.handleDelete}>
            Delete
          </a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          <Icon type="ellipsis" />
        </a>
      </Dropdown>
    )
  }

  render() {
    const { column } = this.props

    return (
      <div className="column-container">
        <div className="column-header">
          <div className="column-title">
            {column.title} ({column.name})
          </div>

          {this.renderColumnMenu()}
        </div>

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
