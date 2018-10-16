import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, Input } from 'antd'
import noop from 'lodash/noop'

const FormItem = Form.Item

// import './style.css'

class BoardEditModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    defaultBoard: PropTypes.object,

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    defaultBoard: {},

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
    const { visible, defaultBoard, form } = this.props

    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem>
          {form.getFieldDecorator('name', {
            initialValue: defaultBoard.name,
            rules: [{ required: true, message: 'Please input board name!' }],
          })(<Input placeholder="Name" />)}
        </FormItem>

        <FormItem>
          {form.getFieldDecorator('title', {
            initialValue: defaultBoard.title,
          })(<Input placeholder="Title" />)}
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(BoardEditModal)
