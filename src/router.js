import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { object } from 'prop-types';
import lodable from 'react-loadable';
import { Spin } from 'antd';
/* Dynamically load reducer. */
import injectAsyncReducer from './injectAsyncReducer';
import Layout from './Layout';
import { Exception } from 'ant-design-pro';
/* Router with lazy loaded pages. */
class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  constructor(props, context) {
    super(props);

    this.IndexPage = lodable({
      loader: () => {
        injectAsyncReducer(context.store, 'Index', require('./Index/reducer').default);
        return import('./Index/container');
      },
      loading: () => <Spin spinning />,
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={this.IndexPage} />
            <Route component={() => <Exception type="404" />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Router;
