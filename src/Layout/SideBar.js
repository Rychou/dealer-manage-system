import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Logo from './Logo';
import BIcon from '../common/BIcon';
import { menus } from '@/utils/config';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideBar extends Component {
  state = {
    selectedKeys: [`${this.props.location.pathname}`],
  };

  render() {
    this.props.history.listen(({ pathname }) => {
      this.setState({ selectedKeys: [`${pathname}`] });
    });
    const Menus = menus.map(menu => {
      if (menu.isSub) {
        return (
          <SubMenu
            key={menu.subName}
            title={
              <span>
                <BIcon type={menu.icon} />
                <span>{menu.subName}</span>
              </span>
            }
          >
            {menu.subs.map(item => (
              <Menu.Item key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={menu.path}>
          <Link to={menu.path}>
            <BIcon type={menu.icon} />
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      );
    });
    return (
      <Sider
        style={{ boxShadow: '2px 0px 6px 0px rgba(0,21,41,0.35)', zIndex: 99 }}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={this.props.onCollapse}
      >
        <Link to="/">
          <Logo collapsed={this.props.collapsed} />
        </Link>
        <Menu
          theme="dark"
          // defaultSelectedKeys={this.state.selectedKeys}
          selectedKeys={this.state.selectedKeys}
          defaultOpenKeys={['首页']}
          mode="inline"
        >
          {Menus}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideBar);
