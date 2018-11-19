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
  }

  render() {
    const {
      user: { isLogin },
    } = this.props;
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/login" component={this.LoginPage} />
            <PrivateRoute component={() => <Exception type="404" />} isLogin={isLogin} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Router));
