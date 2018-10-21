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

    this.ListPage = lodable({
      loader: () => {
        /* Aynchronously load reducer. */
        injectAsyncReducer(
          context.store,
          /* Reducer name. */
          'list',
          /* Reducer function. */
          require('./pages/List/reducer').default, // eslint-disable-line global-require
        );

        return import('./pages/List/container');
      },
      loading: () => {
        return <Spin />;
      },
    });

    this.IndexPage = lodable({
      loader: () => import('./pages/Index/component'),
      loading: () => <Spin spinning />,
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={this.IndexPage} />
            <Route path="/list" component={this.ListPage} />
            <Route path="/detail" component={() => <div>123</div>} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Router;
