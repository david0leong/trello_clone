import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, Input } from 'antd'
import get from 'lodash/get'
import noop from 'lodash/noop'

import { modalFormItemLayout } from '../../utils/form'

const FormItem = Form.Item

class TaskEditModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    defaultTask: PropTypes.object,

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    defaultTask: {},

    onSubmit: noop,
    onCancel: noop,
  }

  handleOk = e => {
    const { form, onSubmit } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values)

        this.resetForm()
      }
    })
  }

  handleCancel = e => {
    const { onCancel } = this.props

    onCancel()

    this.resetForm()
  }

  resetForm() {
    const { form } = this.props

    form.resetFields()
  }

  render() {
    const { visible, defaultTask, form } = this.props
    const title = defaultTask ? 'Edit Task' : 'Add Task'

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem {...modalFormItemLayout} label="Name">
          {form.getFieldDecorator('name', {
            initialValue: get(defaultTask, 'name'),
            rules: [{ required: true, message: 'Please input column name!' }],
          })(<Input placeholder="Name" />)}
        </FormItem>

        <FormItem {...modalFormItemLayout} label="Title">
          {form.getFieldDecorator('title', {
            initialValue: get(defaultTask, 'title'),
          })(<Input placeholder="Title" />)}
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(TaskEditModal)
