import { Layout } from 'antd';
import React, { Component } from 'react';
import SideBar from './SideBar';
import Header from './Header';

const { Content, Footer } = Layout;

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
          <Footer style={{ textAlign: 'center' }}>Copyright © 2018 公交云体验技术部出品</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;
