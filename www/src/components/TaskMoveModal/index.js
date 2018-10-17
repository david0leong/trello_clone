import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, Select } from 'antd'
import noop from 'lodash/noop'

import { modalFormItemLayout } from '../../utils/form'

const FormItem = Form.Item
const Option = Select.Option

class TaskMoveModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    currentTask: PropTypes.object.isRequired,
    taskPositions: PropTypes.shape({
      columnPositions: PropTypes.arrayOf(PropTypes.object),
      columnTaskPositions: PropTypes.object,
    }).isRequired,

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,

    onSubmit: noop,
    onCancel: noop,
  }

  handleOk = () => {
    const { currentTask, form, onSubmit } = this.props

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      // If position did not change, just close modal
      if (
        values.column_id === currentTask.column_id &&
        values.position === currentTask.position
      ) {
        this.handleCancel()
      } else {
        onSubmit(values)

        this.resetForm()
      }
    })
  }

  handleCancel = () => {
    const { onCancel } = this.props

    onCancel()

    this.resetForm()
  }

  // When column changes, set position to 1
  handleColumnChange = columnId => {
    const { form } = this.props

    form.setFieldsValue({
      position: 1,
    })
  }

  resetForm() {
    const { form } = this.props

    form.resetFields()
  }

  renderPositionSelect() {
    const {
      currentTask,
      taskPositions: { columnTaskPositions },
      form,
    } = this.props
    const columnId = form.getFieldValue('column_id')
    const taskPositions = columnTaskPositions[columnId]
    const lastPosition = taskPositions ? taskPositions.length + 1 : 1
    const lastPositionOption = (
      <Option key="last" value={lastPosition}>
        Move to last
      </Option>
    )

    return (
      <FormItem {...modalFormItemLayout} label="Position">
        {form.getFieldDecorator('position', {
          initialValue: currentTask.position,
          rules: [
            {
              required: true,
              message: 'Please select position to move task to!',
            },
          ],
        })(
          <Select style={{ width: '100%' }}>
            {taskPositions &&
              taskPositions.map(taskPosition => (
                <Option key={taskPosition.id} value={taskPosition.position}>
                  {taskPosition.title}
                </Option>
              ))}
            {columnId !== currentTask.column_id && lastPositionOption}
          </Select>
        )}
      </FormItem>
    )
  }

  render() {
    const {
      visible,
      currentTask,
      taskPositions: { columnPositions },
      form,
    } = this.props
    const title = 'Move Task'

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem {...modalFormItemLayout} label="Column">
          {form.getFieldDecorator('column_id', {
            initialValue: currentTask.column_id,
            rules: [
              {
                required: true,
                message: 'Please select column to move task to!',
              },
            ],
            onChange: this.handleColumnChange,
          })(
            <Select style={{ width: '100%' }}>
              {columnPositions.map(columnPosition => (
                <Option key={columnPosition.id} value={columnPosition.id}>
                  {columnPosition.title}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        {this.renderPositionSelect()}
      </Modal>
    )
  }
}

export default Form.create()(TaskMoveModal)
