import React, { Component } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { string, object, bool, func } from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Login/actions';
import './user.less';

@hot(module)
class User extends Component {
  handleLogout = () => {
    localStorage.removeItem('userMsg');
    this.props.logout();
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/">个人信息</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user/set">设置</Link>
        </Menu.Item>
        <Menu.Item onClick={this.handleLogout}>
          <span>注销</span>
        </Menu.Item>
      </Menu>
    );

    const { userMsg, isLogin, type } = this.props;
    const UserAvatar = () => {
      if (isLogin) {
        return (
          <Dropdown overlay={menu}>
            <div>
              <Avatar
                style={{
                  backgroundColor: type === 'dealer' ? 'black' : 'green',
                }}
              >
                {type === 'company' ? '集团' : '经销商'}
              </Avatar>
              <span style={{ marginLeft: 8 }}>{userMsg.username}</span>
            </div>
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
  logout: func,
  type: string,
  userMsg: object,
};

const mapStateToProps = state => state.user;
const mapDispatchToProps = dispatch => ({
  logout: payload => dispatch(logout(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
