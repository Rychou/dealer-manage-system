import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, Select, Cascader } from 'antd';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { async } from './actions';
import options from '../Dealer/NewOrder/options';

const FormItem = Form.Item;

@hot(module)
class SignUp extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = () => {
    const { form, signUp } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        signUp({
          username: values.username,
          password: values.password,
          email: values.email,
          dealer: {
            name: values.name,
            gender: values.gender,
            phone: values.phone,
            address: {
              province: values.address[0],
              city: values.address[1],
              district: values.address[2],
              street: values.address[3],
              details: values.details,
            },
            note: values.note,
          },
        });
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致！');
    } else {
      callback();
    }
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState(prevState => ({
      confirmDirty: prevState.confirmDirty || !!value,
    }));
  };

  render() {
    const {
      showSignUp,
      form: { getFieldDecorator },
      toggleShowSignUp,
    } = this.props;

    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Modal
        style={{ top: 20 }}
        onOk={this.handleSubmit}
        onCancel={toggleShowSignUp}
        visible={showSignUp}
        title="注册"
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formLayout} label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '您输入的邮箱格式不符',
                },
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ],
            })(<Input placeholder="请输入注册邮箱" />)}
          </FormItem>
          <FormItem {...formLayout} label="用户名">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '用户名不能为空哦！',
                },
              ],
            })(<Input placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem {...formLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input type="password" placeholder="密码" />)}
          </FormItem>
          <FormItem {...formLayout} label="确认密码">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请再输入一次密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input
                type="password"
                placeholder="请再次输入密码"
                onBlur={this.handleConfirmBlur}
              />,
            )}
          </FormItem>
          <FormItem {...formLayout} label="姓名">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                },
              ],
            })(<Input placeholder="姓名" />)}
          </FormItem>
          <FormItem {...formLayout} label="性别">
            {getFieldDecorator('gender', {
              initialValue: 'male',
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
            })(
              <Select>
                <Select.Option value="male">男</Select.Option>
                <Select.Option value="female">女</Select.Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formLayout} label="电话号">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请输入电话号',
                },
              ],
            })(<Input placeholder="电话号" />)}
          </FormItem>
          <FormItem {...formLayout} label="地址信息">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '请选择地址信息',
                },
              ],
            })(<Cascader className="address-select" options={options} changeOnSelect />)}
          </FormItem>
          <FormItem {...formLayout} label="详细地址">
            {getFieldDecorator('details', {
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
          <FormItem {...formLayout} label="备注">
            {getFieldDecorator('note', {})(<Input.TextArea placeholder="备注信息，可选。" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

SignUp.propTypes = {
  handleToggleSignUp: PropTypes.func,
  showSignUp: PropTypes.bool,
};

const { signUp } = async;
const mapDispatchToProps = dispatch => ({
  signUp: payload => dispatch(signUp(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Form.create()(SignUp));
