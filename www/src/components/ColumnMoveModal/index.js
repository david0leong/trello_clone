import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, Select } from 'antd'
import noop from 'lodash/noop'

import { modalFormItemLayout } from '../../utils/form'

const FormItem = Form.Item
const Option = Select.Option

class ColumnMoveModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    currentColumn: PropTypes.object.isRequired,
    columnPositions: PropTypes.arrayOf(PropTypes.object),

    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,

    onSubmit: noop,
    onCancel: noop,
  }

  handleOk = () => {
    const { currentColumn, form, onSubmit } = this.props

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      // If position did not change, just close modal
      if (values.position === currentColumn.position) {
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
    const { visible, currentColumn, columnPositions, form } = this.props
    const title = 'Move Column'

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem {...modalFormItemLayout} label="Position">
          {form.getFieldDecorator('position', {
            initialValue: currentColumn.position,
            rules: [
              {
                required: true,
                message: 'Please select position to move column to!',
              },
            ],
          })(
            <Select style={{ width: '100%' }}>
              {columnPositions.map(columnPosition => (
                <Option
                  key={columnPosition.id}
                  value={columnPosition.position}
                  disabled={columnPosition.position === currentColumn.position}
                >
                  {columnPosition.title}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
      </Modal>
    )
  }
}

export default Form.create()(ColumnMoveModal)
