import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func,string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, BackTop } from 'antd';
import './index.less';

@hot(module)
class OrderDetail extends Component {
  componentDidMount() {
    const {
      isResolve,
      fetchOrderDetail,
      match: {
        params: { id },
      },
    } = this.props;
    fetchOrderDetail(id);
  }

  render() {
    const { order } = this.props;
    return (
      <div>123</div>
    );
  }
}

OrderDetail.propTypes = {
  fetchOrderDetail: func,
  id: string,
  isResolve: bool,
};

export default withRouter(OrderDetail);
