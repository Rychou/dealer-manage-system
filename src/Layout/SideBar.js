import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import BIcon from '../Common/BIcon';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideBar extends Component {
  render() {
    return (
      <Sider
        style={{ boxShadow: '2px 0px 6px 0px rgba(0,21,41,0.35)' }}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={this.props.onCollapse}
      >
        <Logo collapsed={this.props.collapsed} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <BIcon type="anticon-bulb" />
                <span>电量监控</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/">Option 1</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="2">
            <Link to="/list">
              <BIcon type="anticon-location" />
              <span>地图分布</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <BIcon type="anticon-alert" />
                <span>车辆监控</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <BIcon type="anticon-deploymentunit" />
                <span>统计分析</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
