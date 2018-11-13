import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import './index.less';

const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = e => {
    const {
      form: { validateFields },
      fetchUser,
      history,
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const dealer = values.userName === 'Rychou' && values.password === '123456';
        const company = values.userName === 'Simons' && values.password === '123456';
        if (dealer) {
          fetchUser({ type: 'dealer' });
        }
        if (company) {
          fetchUser({ type: 'company' });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      isLogin,
    } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (isLogin) {
      return <Redirect to={from} />;
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
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
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

export default withRouter(Form.create()(Login));
