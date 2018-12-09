import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func,string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Divider, Icon } from 'antd';
import './index.less';
import Products from './Products';

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
      <div style={{marginLeft:20}}>
        <h1 style={{marginTop:20}}><Icon type="reconciliation" theme="twoTone" style={{fontSize: 30}} /> 订单编号：{order.id}</h1>
        <Divider />
        <h2>下单时间：{order.orderedAt}</h2>
        <div hidden>
          <h2>付款时间：{order.paidAt}</h2>
          <h2>付款时间：{order.paidAt}</h2>
        </div>
        <h2 style={{marginBottom:-20}}>订购产品</h2>
        <Divider />
        <Products products = {order.orderDetails} />
        <Divider />
      </div>
    );
  }
}

OrderDetail.propTypes = {
  fetchOrderDetail: func,
  id: string,
  isResolve: bool,
};

export default withRouter(OrderDetail);
