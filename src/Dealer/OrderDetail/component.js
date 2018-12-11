import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Divider, Icon } from 'antd';
import './index.less';
import Products from './Products';
import Express from './Express';

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
    fetchOrderDetail({ id });
  }

  render() {
    const { order, express } = this.props;
    const expressData = {
      ERRORCODE: '0',
      RESULT: {
          com: '申通快递',
          context: [
              {
                  time: '2018-12-09 10:58:05',
                  desc: '杭电代签-已签收',
              },
              {
                  time: '2018-12-09 06:29:41',
                  desc: '浙江杭州下沙公司-学校自取件86926527(18967165848,)-派件中',
              },
              {
                  time: '2018-12-09 05:44:41',
                  desc: '已到达-浙江杭州下沙公司',
              },
              {
                  time: '2018-12-09 03:36:32',
                  desc: '浙江杭州中转部-已发往-浙江杭州下沙公司',
              },
              {
                  time: '2018-12-08 23:31:35',
                  desc: '上海中转部-已装袋发往-浙江杭州中转部',
              },
              {
                  time: '2018-12-08 21:31:42',
                  desc: '上海青浦开发区公司-已装袋发往-上海中转部',
              },
              {
                  time: '2018-12-08 21:27:28',
                  desc: '上海青浦开发区公司-已发往-上海中转部',
              },
              {
                  time: '2018-12-08 21:27:28',
                  desc: '上海青浦开发区公司-已进行装袋扫描',
              },
              {
                  time: '2018-12-08 21:09:44',
                  desc: '上海青浦开发区公司-合雨(18656679648)-已收件',
              },
          ],
      },
  };
    // console.log('order->>>', order);
    return (
      <div style={{ marginLeft: 20 }}>
        <h1 style={{ marginTop: 20 }}>
          <Icon type="reconciliation" theme="twoTone" style={{ fontSize: 30 }} /> 订单编号：{order.id}
        </h1>
        <Divider />
        <h2>下单时间：{order.orderedAt}</h2>
        <div hidden>
          <h2>付款时间：{order.paidAt}</h2>
          <h2>付款时间：{order.paidAt}</h2>
        </div>
        <Divider />
        <Express express={expressData} />
        {/* <Express express={express} /> */}
        <Divider />
        <h2 style={{ marginBottom: -20 }}>订购产品</h2>
        <Divider />
        <Products products={order.orderDetails} />
        <Divider />
      </div>
    );
  }
}

OrderDetail.propTypes = {
  fetchOrderDetail: func,
  isResolve: bool,
};


export default withRouter(OrderDetail);
