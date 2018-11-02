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
        injectAsyncReducer(
          context.store,
          'companies',
          require('./Index/reducer').default,
        );
        return import('./Index/container');
      },
      loading: () => <Spin spinning />,
    });
    this.BusMonitor = lodable({
      loader: () => {
        injectAsyncReducer(
          context.store,
          'busMonitor',
          require('./BusMonitor/reducer').default,
        );
        return import('./BusMonitor/container');
      },
      loading: () => <Spin />,
    });
    this.BusDetail = lodable({
      loader: () => {
        injectAsyncReducer(
          context.store,
          'busDetail',
          require('./BusDetail/reducer').default,
        );
        return import('./BusDetail/container');
      },
      loading: () => <Spin />,
    });
    this.CarManage = lodable({
      loader: () => {
        injectAsyncReducer(
          context.store,
          'buses',
          require('./BusManagement/reducer').default,
        );
        return import('./BusManagement/container');
      },
      loading: () => <Spin />,
    });
    this.BusReport = lodable({
      loader: () => {
        injectAsyncReducer(
          context.store,
          'busReport',
          require('./BusReport/reducer'),
        );
        return import('./BusReport/container');
      },
      loading: () => <Spin />,
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={this.IndexPage} />
            <Route exact path="/buses/monitor" component={this.BusMonitor} />
            <Route exact path="/buses/monitor/:id" component={this.BusDetail} />
            <Route exact path="/buses" component={this.CarManage} />
            <Route exact path="/buses/report" component={this.BusReport} />
            <Route component={() => <Exception type="404" />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Router;
