import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.less';
import SignUp from './SignUp';
import { hot } from 'react-hot-loader';

const FormItem = Form.Item;
@hot(module)
class Login extends Component {
  state = {
    showSignUp: false,
  };

  handleSubmit = e => {
    const {
      form: { validateFields },
      login,
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        // const dealer =
        //   values.userName === 'Rychou' && values.password === '123456';
        // const company =
        //   values.userName === 'Simons' && values.password === '123456';
        // if (dealer) {
        //   fetchUser({ type: 'dealer' });
        // }
        // if (company) {
        //   fetchUser({ type: 'company' });
        // }
        login({
          username: values.username,
          password: values.password,
          remember: values.remember,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      isLogin,
      showSignUp,
      toggleShowSignUp,
      loginFetchState: { isFetching },
    } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (isLogin) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <Form layout="horizontal" onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}

            <Button
              loading={isFetching}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            <Button style={{ width: '100%' }} onClick={toggleShowSignUp}>
              注册
            </Button>
          </FormItem>
        </Form>
        <SignUp showSignUp={showSignUp} toggleShowSignUp={toggleShowSignUp} />
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object,
  isLogin: PropTypes.bool,
  location: PropTypes.object,
  login: PropTypes.func,
};

export default withRouter(Form.create()(Login));
