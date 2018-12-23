import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Divider, Icon, Button, Modal, Spin } from 'antd';
import './index.less';
import Products from './Products';
import Express from './Express';
import { orderStatus } from 'utils';

const { confirm } = Modal;

const Address = (address) => {
    const style = { marginLeft: 10 };
    if (address) {
        return (
            <span>
                <span style={style}>{address.province}</span>
                <span style={style}>{address.city}</span>
                <span style={style}>{address.district}</span>
                <span style={style}>{address.street}</span>
                <span style={style}>{address.details}</span>
            </span>

        );
    }
    return null;
};

Address.prototype = {
    address: object,
};


@hot(module)
class OrderDetail extends Component {
  state = {
      loading: true,
  }

  componentDidMount() {
    const {
    //   isResolve,
      fetchOrderDetail,
      match: {
        params: { id },
      },
    } = this.props;
    fetchOrderDetail({ id });
    this.setState({ loading: false });
  }

  comfirmOrder(id) {
    confirm({
        title: '是否确认收货？',
        onOk: () => {
            const {
                updateOrderStatus,
            } = this.props;
            updateOrderStatus({ id, status: 5 });
        },
    });
}


  render() {
    const { order, express } = this.props.OrderDetail;
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
    return (
    <Spin spinning={this.state.loading}>
      <div id="main">
        <h2>
          <Icon type="reconciliation" theme="twoTone" style={{ fontSize: 30 }} /> 订单编号：{order.id}
          <div style={{ float: 'right' }}>
                {
                  order.status === 4 ?
                    <Button
                        type="primary"
                        onClick={this.comfirmOrder.bind(this, order.id)}
                        style={{ marginRight: 20 }}
                    >确认收货
                    </Button>
                    : null
                }
          </div>
        </h2>

        <Divider />
        <div id="info">
            <div style={{ float: 'left', marginLeft: 100 }}>
                <h3>下单时间：{order.orderedAt}</h3>
                {
                    order.status > 0 ?
                        <div><h3>付款时间：{order.paidAt}</h3></div>
                        : null
                }
                <h3>订单状态：{orderStatus(order.status)}</h3>
            </div>
            <div style={{ float: 'right', marginRight: 100 }}>
                <h3>收货人：{order.name}</h3>
                <h3>联系电话：{order.phone}</h3>
                <h3>收货地址：{Address(order.address)}</h3>
            </div>
        </div>
        <Divider style={{ marginTop: 150 }} />
        {
            order.status >= 3 && order.status <= 5 ?
                Express(expressData)
                : null
        }
        <br />
        <h2 style={{ marginBottom: -20 }}>订购产品</h2>
        <Divider />
        <Products products={order.orderDetails} />
      </div>
    </Spin>
    );
  }
}

OrderDetail.propTypes = {
  fetchOrderDetail: func,
  match: object,
  OrderDetail: object,
  updateOrderStatus: func,
};


export default withRouter(OrderDetail);
