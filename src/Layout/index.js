import { Layout, Icon } from 'antd';
import React, { Component } from 'react';
import SideBar from './SideBar';
import Header from './Header';
import { GlobalFooter } from 'ant-design-pro';

const { Content, Footer } = Layout;
const links = [
  {
    key: '帮助',
    title: '帮助',
    href: '',
  },
  {
    key: '隐私',
    title: '隐私',
    href: '',
  },
  {
    key: '条款',
    title: '条款',
    href: '',
  },
];
const CopyRight = (
  <div>
    Copyright <Icon type="copyright" /> 2018 公交云体验技术部出品
  </div>
);
class AppLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
        <Layout>
          <Header collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
          <Content style={{ margin: '24px 16px 0' }}>{this.props.children}</Content>
          <GlobalFooter links={links} copyright={CopyRight} />
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;
