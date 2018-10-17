import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, Select } from 'antd'
import get from 'lodash/get'
import noop from 'lodash/noop'

const FormItem = Form.Item
const Option = Select.Option

class ColumnMoveModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    column: PropTypes.object.isRequired,

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,

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
    const { visible, column, form } = this.props
    const title = 'Move Column'

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem>
          {form.getFieldDecorator('position', {
            initialValue: get(column, 'position'),
            rules: [
              {
                required: true,
                message: 'Please select position to move column to!',
              },
            ],
          })(
            <Select defaultValue="lucy">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          )}
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(ColumnMoveModal)
