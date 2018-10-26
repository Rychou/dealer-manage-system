import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { object } from 'prop-types';
import lodable from 'react-loadable';
import { Spin } from 'antd';
/* Dynamically load reducer. */
import injectAsyncReducer from './injectAsyncReducer';
import Layout from './Layout';

/* Router with lazy loaded pages. */
class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  constructor(props, context) {
    super(props);

    this.IndexPage = lodable({
      loader: () => import('./Index/container'),
      loading: () => <Spin spinning />,
    });
    this.BusMonitor = lodable({
      loader: () => import('./BusMonitor/container'),
      loading: () => <Spin />,
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={this.IndexPage} />
            <Route exact path="/busMonitor" component={this.BusMonitor} />
            <Route exact path="/carManage/test" component={() => <div>123</div>} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Router;
