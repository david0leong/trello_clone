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
    taskPositions: PropTypes.arrayOf(PropTypes.object),

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
      if (values.position === currentTask.position) {
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

  resetForm() {
    const { form } = this.props

    form.resetFields()
  }

  render() {
    const { visible, currentTask, taskPositions, form } = this.props
    const title = 'Move Task'

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
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
              {taskPositions.map(taskPosition => (
                <Option
                  key={taskPosition.position}
                  value={taskPosition.position}
                  disabled={taskPosition.position === currentTask.position}
                >
                  {taskPosition.title}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(TaskMoveModal)
