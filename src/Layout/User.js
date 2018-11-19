import React, { Component } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { object, bool } from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './user.less';

@hot(module)
class User extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/">个人信息</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user/set">设置</Link>
        </Menu.Item>
      </Menu>
    );

    const { userMsg, isLogin } = this.props;
    const UserAvatar = () => {
      if (isLogin) {
        return (
          <Dropdown overlay={menu}>
            <Avatar>{userMsg.name}</Avatar>
          </Dropdown>
        );
      }
      return <Avatar>未登录</Avatar>;
    };
    return <span className="user-container">{UserAvatar()}</span>;
  }
}

User.propTypes = {
  isLogin: bool,
  user: object,
};

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(User);
