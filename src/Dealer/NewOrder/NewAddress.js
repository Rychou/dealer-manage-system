import React, { Component } from 'react';
import { Modal, Form, Cascader, Button, Input, message, Checkbox } from 'antd';
import options from './options';
import { hot } from 'react-hot-loader';

const FormItem = Form.Item;
@hot(module)
class NewAddress extends Component {
  handleSubmit = e => {
    const {
      isEdit,
      updateLocalAddressList,
      form: { validateFields, resetFields },
      handleUnShowModal,
      editIndex,
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const addressList = JSON.parse(localStorage.getItem('addressList')) || [];
        if (isEdit) {
          addressList.splice(editIndex, 1, values);
          localStorage.setItem('addressList', JSON.stringify(addressList));
          updateLocalAddressList();
          message.success('编辑成功');
        } else {
          if (values.isDefault) {
            addressList.forEach(address => {
              address.isDefault = false;
            });
          }
          addressList.push(values);
          localStorage.setItem('addressList', JSON.stringify(addressList));
          updateLocalAddressList();
          message.success('新增成功');
        }
        resetFields();
        handleUnShowModal();
      }
    });
  };

  render() {
    const {
      form,
      form: { getFieldDecorator },
      visible,
      handleUnShowModal,
      editAddress,
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <div className="new-address">
        <Modal
          title="新增地址"
          visible={visible}
          onOk={this.handleOk}
          onCancel={() => {
            handleUnShowModal();
            form.resetFields();
          }}
          okButtonProps={{ htmlType: 'submit', onClick: this.handleSubmit }}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="地址信息">
              {getFieldDecorator('address', {
                initialValue: editAddress.address,
                rules: [
                  {
                    required: true,
                    message: '请选择地址信息',
                  },
                ],
              })(
                <Cascader
                  className="address-select"
                  options={options}
                  changeOnSelect
                  onChange={this.handleChage}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="详细地址">
              {getFieldDecorator('detailAddress', {
                initialValue: editAddress.detailAddress,
                rules: [
                  {
                    required: true,
                    message: '请输入详细地址',
                  },
                ],
              })(
                <Input.TextArea placeholder="请输入详细地址，如道路、门牌号、小区、楼栋号、单元等信息" />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="邮政编码">
              {getFieldDecorator('zipCode', {
                initialValue: editAddress.zipCode,
                rules: [],
              })(<Input placeholder="请输入邮政编码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="收件人姓名">
              {getFieldDecorator('name', {
                initialValue: editAddress.name,
                rules: [
                  {
                    required: true,
                    message: '请输入收件人姓名',
                  },
                ],
              })(<Input placeholder="请输入收件人姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="手机号码">
              {getFieldDecorator('phone', {
                initialValue: editAddress.phone,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号码',
                  },
                ],
              })(<Input placeholder="请输入手机号码" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('isDefault', {
                valuePropName: 'checked',
                initialValue: editAddress.isDefault,
              })(<Checkbox style={{ marginLeft: 120 }}>设置为默认地址</Checkbox>)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(NewAddress);
