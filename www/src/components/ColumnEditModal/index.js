import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, Input } from 'antd'
import get from 'lodash/get'
import noop from 'lodash/noop'

const FormItem = Form.Item

class ColumnEditModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    defaultColumn: PropTypes.object,

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    defaultColumn: {},

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
    const { visible, defaultColumn, form } = this.props
    const title = defaultColumn ? 'Edit Column' : 'Add Column'

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem>
          {form.getFieldDecorator('name', {
            initialValue: get(defaultColumn, 'name'),
            rules: [{ required: true, message: 'Please input column name!' }],
          })(<Input placeholder="Name" />)}
        </FormItem>

        <FormItem>
          {form.getFieldDecorator('title', {
            initialValue: get(defaultColumn, 'title'),
          })(<Input placeholder="Title" />)}
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(ColumnEditModal)
