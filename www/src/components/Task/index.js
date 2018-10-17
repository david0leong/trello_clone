/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from 'antd'

import './style.css'

class Task extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired,

    onEdit: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  renderTaskMenu() {
    const { onEdit, onMove, onDelete } = this.props

    const menu = (
      <Menu>
        <Menu.Item key="edit">
          <a href="#" onClick={onEdit}>
            Edit
          </a>
        </Menu.Item>

        <Menu.Item key="position">
          <a href="#" onClick={onMove}>
            Move
          </a>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="delete">
          <a href="#" onClick={onDelete}>
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
    const { task } = this.props

    return (
      <div className="task-container">
        <div className="task-title">
          {task.title} ({task.name})
        </div>

        {this.renderTaskMenu()}
      </div>
    )
  }
}

export default Task
