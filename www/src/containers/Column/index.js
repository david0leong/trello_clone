/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Dropdown, Icon, Button } from 'antd'
import get from 'lodash/get'

import { selectTaskPositionsOfBoard } from '../../redux/boards/selectors'
import {
  addTaskRequest,
  updateTaskRequest,
  moveTaskRequest,
  deleteTaskRequest,
} from '../../redux/actions'

import Task from '../../components/Task'
import TaskEditModal from '../../components/TaskEditModal'
import TaskMoveModal from '../../components/TaskMoveModal'

import './style.css'

class Column extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,

    onEdit: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,

    // Redux state
    taskPositions: PropTypes.shape({
      columnPositions: PropTypes.arrayOf(PropTypes.object),
      columnTaskPositions: PropTypes.object,
    }).isRequired,

    // Redux actions
    addTaskRequest: PropTypes.func.isRequired,
    updateTaskRequest: PropTypes.func.isRequired,
    moveTaskRequest: PropTypes.func.isRequired,
    deleteTaskRequest: PropTypes.func.isRequired,
  }

  state = {
    taskEditModalVisible: false,
    taskInEdit: null,

    taskMoveModalVisible: false,
    taskInMove: null,
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

  showTaskMoveModal = task => () => {
    if (task) {
      this.setState({
        taskMoveModalVisible: true,
        taskInMove: task,
      })
    }
  }

  handleTaskMoveModalSubmit = values => {
    const { moveTaskRequest } = this.props
    const { taskInMove } = this.state

    if (!taskInMove) {
      return
    }

    moveTaskRequest({
      id: taskInMove.id,
      params: values,
    })

    this.setState({
      taskMoveModalVisible: false,
      taskInMove: null,
    })
  }

  handleTaskMoveModalCancel = () => {
    this.setState({
      taskMoveModalVisible: false,
      taskInMove: null,
    })
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

  renderTaskMoveModal() {
    const { column, taskPositions } = this.props
    const { taskMoveModalVisible, taskInMove } = this.state

    if (!column || !taskInMove) {
      return null
    }

    return (
      <TaskMoveModal
        key={taskInMove.id}
        visible={taskMoveModalVisible}
        currentTask={taskInMove}
        taskPositions={taskPositions}
        onSubmit={this.handleTaskMoveModalSubmit}
        onCancel={this.handleTaskMoveModalCancel}
      />
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
              onMove={this.showTaskMoveModal(task)}
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
          defaultTask={taskInEdit}
          onSubmit={this.handleTaskEditModalSubmit}
          onCancel={this.handleTaskEditModalCancel}
        />

        {this.renderTaskMoveModal()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { column } = props

  return {
    taskPositions: selectTaskPositionsOfBoard(state, column.board_id),
  }
}

const mapDispatchToProps = {
  addTaskRequest,
  updateTaskRequest,
  moveTaskRequest,
  deleteTaskRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Column)
