/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Dropdown, Icon, Button } from 'antd'
import get from 'lodash/get'

import {
  addTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from '../../redux/actions'
import Task from '../../components/Task'
import TaskEditModal from '../../components/TaskEditModal'

import './style.css'

class Column extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,

    onEdit: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,

    // Redux actions
    addTaskRequest: PropTypes.func.isRequired,
    updateTaskRequest: PropTypes.func.isRequired,
    deleteTaskRequest: PropTypes.func.isRequired,
  }

  state = {
    taskEditModalVisible: false,
    taskInEdit: null,
  }

  showTaskEditModal = task => () => {
    this.setState({
      taskEditModalVisible: true,
      taskInEdit: task,
    })
  }

  handleTaskEditModalSubmit = values => {
    const { column, addTaskRequest, updateTaskRequest } = this.props
    const { taskInEdit } = this.state

    if (taskInEdit) {
      updateTaskRequest({
        id: taskInEdit.id,
        params: values,
      })
    } else {
      addTaskRequest({
        columnId: column.id,
        params: values,
      })
    }

    this.setState({
      taskEditModalVisible: false,
      taskInEdit: null,
    })
  }

  handleTaskEditModalCancel = () => {
    this.setState({
      taskEditModalVisible: false,
      taskInEdit: null,
    })
  }

  handleMoveTask = task => (columnId, position) => {
    // TODO: Handle moving task
  }

  handleDeleteTask = task => () => {
    const { deleteTaskRequest } = this.props

    if (window.confirm('Are you sure to remove this task?')) {
      deleteTaskRequest(task.id)
    }
  }

  renderColumnMenu() {
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
    const { column } = this.props
    const { taskEditModalVisible, taskInEdit } = this.state

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
            <Task
              key={task.id}
              task={task}
              onEdit={this.showTaskEditModal(task)}
              onMove={this.handleMoveTask(task)}
              onDelete={this.handleDeleteTask(task)}
            />
          ))}
        </div>

        <div className="column-footer">
          <Button
            block
            type="primary"
            className="btn-add-task"
            onClick={this.showTaskEditModal(null)}
          >
            <Icon type="plus" /> Add Task
          </Button>
        </div>

        <TaskEditModal
          key={get(taskInEdit, 'id', 'new')}
          visible={taskEditModalVisible}
          defaultModel={taskInEdit}
          onSubmit={this.handleTaskEditModalSubmit}
          onCancel={this.handleTaskEditModalCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = null

const mapDispatchToProps = {
  addTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Column)
