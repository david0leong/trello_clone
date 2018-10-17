/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from 'antd'

import Task from '../Task'
import ColumnEditModal from '../ColumnEditModal'

import './style.css'

class Column extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,

    onUpdate: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  state = {
    editModalVisible: false,
  }

  handleEdit = () => {
    this.setState({
      editModalVisible: true,
    })
  }

  handleMove = () => {}

  handleDelete = () => {
    const { onDelete } = this.props

    if (window.confirm('Are you sure to remove this column?')) {
      onDelete()
    }
  }

  handleEditModalSubmit = values => {
    const { onUpdate } = this.props

    onUpdate(values)

    this.setState({
      editModalVisible: false,
    })
  }

  handleEditModalCancel = () => {
    this.setState({
      editModalVisible: false,
    })
  }

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
    const { editModalVisible } = this.state

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

        <ColumnEditModal
          key={column.id}
          visible={editModalVisible}
          columnInEdit={column}
          onSubmit={this.handleEditModalSubmit}
          onCancel={this.handleEditModalCancel}
        />
      </div>
    )
  }
}

export default Column
