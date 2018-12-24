import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Divider, Icon, Button, Modal, Spin, Tooltip } from 'antd';
import './index.less';
import Products from './Products';
import Express from './Express';
import { orderStatus } from 'utils';
import ExpressForm from './ExpressForm';
import moment from 'moment';


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
      fetchCompanyOrderDetail,
      match: {
        params: { id },
      },
    } = this.props;
    fetchCompanyOrderDetail({ id });
  }

  handleShowModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const {
        linkExpress,
        fetchCompanyOrderDetail,
      } = this.props;
      const { order } = this.props.OrderDetail;
      const { id } = order;
      const { expressNumber } = values;
      linkExpress({ id, expressNumber, status: 3, fetchCompanyOrderDetail });
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  confirmOrder = id => {
    // const id = props.id || {};
    confirm({
      title: '是否确认订单？',
      onOk: () => {
        const {
          updateCompanyOrderStatus,
          fetchCompanyOrderDetail,
        } = this.props;
        updateCompanyOrderStatus({ id, status: 2, fetchCompanyOrderDetail });
      },
    });
  }

  render() {
    const { order, express, isFetching } = this.props.OrderDetail;
    return (
      <Spin spinning={isFetching}>
        <div id="main">
          <h2 style={{ marginTop: 20 }}>
            <Icon type="reconciliation" theme="twoTone" style={{ fontSize: 30 }} /> 订单编号：{order.id}
            <div className="button">
              {

                order.orderStatus === 1 ?
                  <Button
                    type="primary"
                    id="comfirmed"
                    onClick={this.confirmOrder.bind(this, order.id)}
                  >确认订单
                  </Button>
                  : null
              }
              {

                order.orderStatus === 2 ?
                  <div>
                    <Button
                      type="primary"
                      id="link"
                      onClick={this.handleShowModal}
                    >关联物流
                    </Button>
                    <ExpressForm
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      onCreate={this.handleCreate}
                    />
                  </div>
                  : null
              }
            </div>
          </h2>
          <Divider />
          <div>
            <div style={{ float: 'left', marginLeft: 100 }}>
              <h3>下单时间：{moment(order.orderedAt).format('YYYY-MM-DD HH:mm:ss')}</h3>
              {
                order.orderStatus > 0 ?
                  <div>
                    {/* <h3>付款时间：{moment(order.paidAt).format('YYYY-MM-DD HH:mm:ss')}</h3> */}
                    <h3>付款时间：{moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} </h3>
                  </div>
                  : null
              }
              <h3>订单状态：{orderStatus(order.orderStatus)}</h3>
            </div>
            <div style={{ float: 'right', marginRight: 300 }}>
              <h3>收货人：{order.dealer ? order.dealer.name : null}</h3>
              <h3>联系电话：{order.phone}</h3>
              <h3>收货地址：{Address(order.address)}</h3>
            </div>
          </div>
          <Divider />
          {
            order.orderStatus >= 3 && order.orderStatus <= 5 ?
              Express(express)
              : null
          }
          <br />
          <h2 style={{ marginBottom: -20 }}>订购产品</h2>
          <Divider />
          <Products products={order.orderDetails} />
          <Divider />
        </div>
      </Spin>
    );
  }
}

OrderDetail.propTypes = {
  fetchCompanyOrderDetail: func,
  linkExpress: func,
  match: object,
  OrderDetail: object,
  updateCompanyOrderStatus: func,
};


export default withRouter(OrderDetail);
