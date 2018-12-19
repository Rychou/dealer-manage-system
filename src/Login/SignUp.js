import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input } from 'antd';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { async } from './actions';

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
          roles: ['ROLE_CLIENT'],
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
          {/* <FormItem label="选择用户角色">
            {getFieldDecorator('roles', {
              rules: [{required}],
            })}
          </FormItem> */}
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
