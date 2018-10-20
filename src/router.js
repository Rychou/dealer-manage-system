import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { object } from 'prop-types';
import lodable from 'react-loadable';
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
        return <div>Loading...</div>;
      },
    });

    this.DetailPage = lodable({
      loader: () => {
        return <div>Detail</div>;
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={() => <div>Index</div>} />
            <Route path="/list" component={this.ListPage} />
            <Route path="/detail" component={() => <div>123</div>} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Router;
