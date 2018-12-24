import {
  Modal, Form, Input, Divider,
 } from 'antd';
 import React, { Component } from 'react';

 const FormItem = Form.Item;

 const formatter = (value) => {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Message = (order) => {
  return (
    <div className="pay-order-detail">
      <div>付款</div>
      <Divider />
      <div className="pay-order-detail-item">
        <span className="label">付款账户：</span>
        <span>13357192674</span>
      </div>
      <div className="pay-order-detail-item">
        <span className="label">收货人姓名：</span>
        <span>{order.dealer.name}</span>
      </div>
      <div className="pay-order-detail-item">
        <span className="label">收货地址：</span>
        <span>
        {`${order.address.province} 
          ${order.address.city} 
          ${order.address.district} 
          ${order.address.street} 
          ${order.address.details}`}
        </span>
      </div>
      <div className="pay-order-detail-item">
        <span className="label">联系方式：</span>
        <span>{order.phone}</span>
      </div>
      <div className="pay-order-detail-item">
        <span className="label">总价：</span>
        <span>￥{formatter(order.orderTotalPrice)}</span>
      </div>
    </div>
  );
};

 export default Form.create()(
   // eslint-disable-next-line
   class extends Component {
     render() {
       const {
         visible, onCancel, onCreate, form, order,
       } = this.props;
       const { getFieldDecorator } = form;
       return (
         <Modal
          visible={visible}
          title={Message(order)}
          onCancel={onCancel}
          onOk={onCreate}
          cancelText="取消"
          okText="支付"
         >
          <Form layout="vertical">
              <FormItem label="支付密码">
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入支付密码',
                    },
                  ],
                })(<Input type="password" />)}
              </FormItem>
          </Form>
         </Modal>

       );
     }
   },
 );
