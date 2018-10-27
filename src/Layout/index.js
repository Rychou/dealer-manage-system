import { Layout } from 'antd';
import React, { Component } from 'react';
import SideBar from './SideBar';
import Header from './Header';
import Footer from './Footer';
import { PageHeader } from 'ant-design-pro';
import { withRouter, Link } from 'react-router-dom';
import { breadcrumbNameMap } from '@/utils/config';

const { Content } = Layout;

class AppLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  /**
   * 计算PageHeader组件的Title属性值
   *
   * @param {*} location
   * @returns
   * @memberof AppLayout
   */
  computePageHeaderTitle(location) {
    // breadcrumbNameMap中有对应路由的值则直接返回
    if (breadcrumbNameMap.hasOwnProperty(location.pathname)) {
      return breadcrumbNameMap[location.pathname].name;
    }
    // 这种情况针对带参路由，如:'/buses/monitor/:id'
    const splitPath = location.pathname.split('/');
    for (let i = splitPath.length - 1; i > 0; i--) {
      splitPath.pop();
      const temPath = splitPath.join('/');
      if (breadcrumbNameMap[temPath]) {
        const children = breadcrumbNameMap[temPath].children;
        for (let j = 0; j < children.length; j++) {
          const splitItemPath = children[j].path.split('/');
          if (splitItemPath[splitItemPath.length - 1][0] === ':') {
            return children[j].name;
          }
        }
        break;
      }
    }
    return 404;
  }

  render() {
    const { location } = this.props;
    const isIndex = location.pathname === '/';
    const showPageHeader = isIndex;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
        <Layout>
          <Header collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
          {!showPageHeader ? (
            <PageHeader
              home="首页"
              title={this.computePageHeaderTitle(location)}
              location={location}
              breadcrumbNameMap={breadcrumbNameMap}
              linkElement={Link}
            />
          ) : (
            ''
          )}
          <Content style={{ margin: '24px 16px 0' }}>{this.props.children}</Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(AppLayout);
