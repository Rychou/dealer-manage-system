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
      loader: () => import('./Index/container'),
      loading: () => <Spin spinning />,
    });
    this.BusMonitor = lodable({
      loader: () => import('./BusMonitor/container'),
      loading: () => <Spin />,
    });
    this.CarManage = lodable({
      loader: () => import('./BusManagement/container'),
      loading: () => <Spin />,
    });
  }

  render() {
    const Test = ({ match }) => {
      console.log(match);
      return <div>123</div>;
    };
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={this.IndexPage} />
            <Route exact path="/buses/monitor" component={this.BusMonitor} />
            <Route path="/buses/monitor/:id" component={Test} />
            <Route exact path="/carManage" component={this.CarManage} />
            <Route component={() => <Exception type="404" />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Router;
