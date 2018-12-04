import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { object } from 'prop-types';
import lodable from 'react-loadable';
import { Spin } from 'antd';
/* Dynamically load reducer. */
import injectAsyncReducer from './injectAsyncReducer';
import Layout from './Layout';
import { Exception } from 'ant-design-pro';
import { connect } from 'react-redux';
import PrivateRoute from 'Common/PrivateRoute';
import { routes } from 'utils/config';

/* Router with lazy loaded pages. */
class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  constructor(props, context) {
    super(props);
    this.LoginPage = lodable({
      loader: () => {
        return import('./Login/container');
      },
      loading: () => <Spin spinning />,
    });
    this.initLodables(context);
  }

  /**
   * 初始化lodables
   * lodable函数是对自定义组件的封装，能在不同状态下渲染不同的组件，如在组件正在加载（loading）渲染<Spin/>组件
   * 加载完成再渲染自定义组件
   * @memberof Router
   */
  initLodables = context => {
    for (let i = 0; i < routes.length; i++) {
      this[routes[i].pageName] = lodable({
        loader: () => {
          injectAsyncReducer(context.store, routes[i].stateName, routes[i].reducer);
          return routes[i].container;
        },
        loading: () => <Spin spinning />,
      });
    }
  };

  render() {
    const {
      user: { isLogin, type },
    } = this.props;

    /**
     * 根据utils/config 中 routes 配置条件渲染符合当前用户权限的路由
     * 如集团账户不应渲染出商品购买的路由
     * @returns
     */
    const getRoutes = () => {
      if (isLogin) {
        return routes.length
          ? routes.map((route, index) => {
              if (route.type === type) {
                return route.isPrivate ? (
                  <PrivateRoute
                    key={index}
                    exact={route.isExact}
                    path={route.path}
                    component={this[route.pageName]}
                    isLogin={isLogin}
                  />
                ) : (
                  <Route key={index} exact path={route.path} component={this[route.pageName]} />
                );
              }
            })
          : null;
      }
    };
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/login" component={this.LoginPage} />
            {getRoutes()}
            <PrivateRoute component={() => <Exception type="404" />} isLogin={isLogin} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Router));
