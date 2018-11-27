import React, { Component } from 'react';
import { Modal, Form, Cascader, Button, Input, message, Checkbox } from 'antd';
import options from './options';
import { hot } from 'react-hot-loader';

const FormItem = Form.Item;
@hot(module)
class NewAddress extends Component {
  state = {
    visible: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const addressList = JSON.parse(localStorage.getItem('addressList')) || [];
        if (values.isDefault) {
          addressList.forEach(address => {
            address.isDefault = false;
          });
        }
        addressList.push(values);
        localStorage.setItem('addressList', JSON.stringify(addressList));
        this.props.updateLocalAddressList();
        this.setState({ visible: false });
        message.success('新增成功');
        this.props.form.resetFields();
      }
    });
  };

  handleChage = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  handleClick = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <div className="new-address">
        <Button type="primary" onClick={this.handleClick}>
          新增地址
        </Button>
        <Modal
          title="新增地址"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ htmlType: 'submit', onClick: this.handleSubmit }}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="地址信息">
              {getFieldDecorator('address', {
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
                rules: [],
              })(<Input placeholder="请输入邮政编码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="收件人姓名">
              {getFieldDecorator('name', {
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
                initialValue: true,
              })(<Checkbox style={{ marginLeft: 120 }}>设置为默认地址</Checkbox>)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(NewAddress);
