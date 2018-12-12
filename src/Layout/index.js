import { Layout } from 'antd';
import React, { Component } from 'react';
import SideBar from './SideBar';
import Header from './Header';
import Footer from './Footer';
import { PageHeader } from 'ant-design-pro';
import { withRouter, Link } from 'react-router-dom';
import {
  dealerBreadcrumbNameMap,
  companyBreadcrumbNameMap
} from 'utils/config';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import ShoppingCart from '../Dealer/ShoppingCart/container';

const { Content } = Layout;

@hot(module)
class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

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
  computePageHeaderTitle = (location, breadcrumbNameMap) => {
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
  };

  render() {
    const { location, isLogin, type } = this.props;
    const isIndex = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isNewOrderPage = location.pathname === '/newOrder';
    const showPageHeader = isIndex || isLoginPage || isNewOrderPage;
    const breadcrumbNameMap =
      isLogin && type === 'dealer'
        ? dealerBreadcrumbNameMap
        : companyBreadcrumbNameMap;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        />
        <Layout
          style={{
            marginLeft: this.state.collapsed ? 80 : 200,
            transition: 'margin 0.3s'
          }}
        >
          <Header
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          />
          {!showPageHeader ? (
            <PageHeader
              home='首页'
              title={this.computePageHeaderTitle(location, breadcrumbNameMap)}
              location={location}
              breadcrumbNameMap={breadcrumbNameMap}
              linkElement={Link}
            />
          ) : (
            ''
          )}
          <Content
            style={{
              margin: '24px 16px 0',
              height: '100%',
              backgroundColor: '#fff'
            }}
          >
            {this.props.children}
          </Content>
          {isLogin && type === 'dealer' ? <ShoppingCart /> : null}
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => state.user;

export default withRouter(connect(mapStateToProps)(AppLayout));
