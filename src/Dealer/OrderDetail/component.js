import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Divider, Icon, Button, Modal, Spin, Tooltip } from 'antd';
import './index.less';
import Products from './Products';
import Express from './Express';
import { orderStatus } from 'utils';
import moment from 'moment';
import Pay from './Pay';

const { confirm } = Modal;


const Address = (address) => {
  if (address) {
    return (
      <Tooltip
        title={
          `${address.province} 
                    ${address.city} 
                    ${address.district} 
                    ${address.street} 
                    ${address.details}`
        }
      ><span>{address.province} {address.city} {address.district} {address.street}</span>
      </Tooltip>

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
    visible: false,
  };

  componentDidMount() {
    const {
      //   isResolve,
      fetchOrderDetail,
      match: {
        params: { id },
      },
    } = this.props;
    fetchOrderDetail({ id });
  }

  handleShowModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    const { form } = this.formRef.props;
    this.setState({ visible: false });
    form.resetFields();
  }

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const {
        payDetailOrder,
        fetchOrderDetail,
        match: {
          params: { id },
        },
      } = this.props;
      const { password } = values;
      payDetailOrder({ id, password, status: 1, fetchOrderDetail });
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  comfirmOrder(id) {
    confirm({
      title: '是否确认收货？',
      onOk: () => {
        const {
          updateOrderStatus,
          fetchOrderDetail,
        } = this.props;
        updateOrderStatus({ id, status: 5, fetchOrderDetail });
      },
    });
  }


  render() {
    const { order, express, isFetching } = this.props.OrderDetail;
    return (
      <Spin spinning={isFetching}>
        <div id="main">
          <h2>
            <Icon type="reconciliation" theme="twoTone" style={{ fontSize: 30 }} /> 订单编号：{order.id}
            <div style={{ float: 'right' }}>
              {
                order.orderStatus === 3 ?
                  <Button
                    type="primary"
                    onClick={this.comfirmOrder.bind(this, order.id)}
                    style={{ marginRight: 20 }}
                  >确认收货
                  </Button>
                  : null
              }
              {
                order.orderStatus === 0 ?
                  <div>
                    <Button
                      type="primary"
                      onClick={this.handleShowModal.bind(this)}
                    >付款
                    </Button>
                    <Pay
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      onCreate={this.handleCreate}
                      order={order}
                      confirmLoading={this.props.payStatus.isFetching}
                    />
                  </div>
                  : null
              }
            </div>
          </h2>

          <Divider />
          <div id="info">
            <div style={{ float: 'left', marginLeft: 100 }}>
              <h3>下单时间：{moment(order.orderedAt).format('YYYY-MM-DD HH:mm:ss')}</h3>
              {
                order.orderStatus > 0 ?
                  <div>
                    <h3>付款时间：{moment(order.paidAt).format('YYYY-MM-DD HH:mm:ss')}</h3>
                  </div>
                  : null
              }
              <h3>订单状态：{orderStatus(order.orderStatus)}</h3>
            </div>
            <div style={{ float: 'right', marginRight: 100 }}>
              <h3>收货人：{order.dealer ? order.dealer.name : null}</h3>
              <h3>联系电话：{order.phone}</h3>
              <h3>收货地址：{Address(order.address)}</h3>
            </div>
          </div>
          <Divider style={{ marginTop: 150 }} />
          {
            order.orderStatus >= 3 && order.orderStatus <= 5 ?
              Express(express)
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
  payDetailOrder: func,
  payStatus: object,
  updateOrderStatus: func,
};


export default withRouter(OrderDetail);
