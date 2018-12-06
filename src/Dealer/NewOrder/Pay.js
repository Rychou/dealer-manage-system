import React from 'react';
import { Input, Form, Button, Alert, Divider, message } from 'antd';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { updateCurrentStep } from './actions';
import request from 'request';

const FormItem = Form.Item;
@hot(module)
class Pay extends React.Component {
  state = {
    paying: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          paying: true,
        });
        setTimeout(() => {
          this.setState({ paying: false }, () => {
            request({
              method: 'put',
              url: '/orders',
              data: {
                orderId: this.props.newOrder.orderId,
                status: 1,
              },
            })
              .then(res => {
                console.log(res);
                this.props.history.push('/newOrder/result', { payDate: new Date() });
                message.success('支付成功！');
                this.props.updateCurrentStep(2);
              })
              .catch(err => {
                message.error('支付失败！');
                console.log(err);
              });
          });
        }, 3000);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      address,
      totalPrice,
    } = this.props;
    return (
      <div>
        <Alert message="确认转账后，资金将直接打入对方账户，无法退回。" type="info" showIcon />
        <div className="pay-order-detail">
          <div className="pay-order-detail-item">
            <span className="label">付款账户：</span>
            <span>13357192674</span>
          </div>
          <div className="pay-order-detail-item">
            <span className="label">收货人姓名：</span>
            <span>{address.name}</span>
          </div>
          <div className="pay-order-detail-item">
            <span className="label">收货地址：</span>
            <span>
              {address.address.map((item, index) => (
                <span key={index}>{item} </span>
              ))}
              {address.detailAddress}
            </span>
          </div>
          <div className="pay-order-detail-item">
            <span className="label">联系方式：</span>
            <span>{address.phone}</span>
          </div>
          <div className="pay-order-detail-item">
            <span className="label">总价：</span>
            <span>￥{totalPrice}</span>
          </div>
        </div>
        <Divider />
        <Form layout="inline" onSubmit={this.handleSubmit}>
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
          <br />
          <FormItem>
            <Button
              style={{ marginTop: 12 }}
              loading={this.state.paying}
              type="primary"
              htmlType="submit"
            >
              支付
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => state.NewOrder;
const mapDispatchToProps = dispatch => ({
  updateCurrentStep: payload => dispatch(updateCurrentStep(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Form.create()(Pay)));
