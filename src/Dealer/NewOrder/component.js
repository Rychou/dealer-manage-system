import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { Steps, Row, Col, Button } from 'antd';
import './index.less';
import Address from './Address';
import Products from './Products';
import Overview from './Overview';
import { hot } from 'react-hot-loader';
import { object, func, number, array } from 'prop-types';
import Pay from './Pay';
import PayResult from './PayResult';

const Step = Steps.Step;

@hot(module)
class NewOrder extends Component {
  componentDidMount() {
    const {
      updateProducts,
      location: { state },
      history: { listen },
      updateCurrentStep,
    } = this.props;
    updateProducts(state.products);
    listen(location => {
      switch (location.pathname) {
        case '/newOrder/pay':
          updateCurrentStep(1);
          break;
        case '/newOrder/result':
          updateCurrentStep(2);
          break;
        default:
          updateCurrentStep(0);
          break;
      }
    });
  }

  handleSumbitOrder = () => {
    const { newOrder, products, address, history } = this.props;
    newOrder({
      orderMsg: {
        orderDetails: products.map(({ no, amount }) => {
          return {
            product: { no },
            amount,
          };
        }),
        address: {
          province: address.address[0],
          city: address.address[1],
          district: address.address[2],
          street: address.address[3],
          details: address.detailAddress,
        },
        name: address.name,
        phone: address.phone,
      },
      history,
    });
  };

  render() {
    const {
      updateAddress,
      location: { state },
      address,
      currentStep,
    } = this.props;
    const ConfirmOrder = () => (
      <div>
        <Address updateAddress={updateAddress} />
        <Products products={state.products} />
        {address ? <Overview address={address} products={state.products} /> : null}
        <Button
          type="primary"
          disabled={!address}
          className="submit-order"
          onClick={this.handleSumbitOrder}
        >
          提交订单
        </Button>
      </div>
    );
    return (
      <div className="new-order-container" style={{ backgroundColor: '#fff' }}>
        <Row>
          <Col span={6}>
            <Steps
              direction="vertical"
              current={currentStep}
              size="small"
              style={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Step title="确认订单" description="确认你的订单信息" />
              <Step title="付款" description="" />
              <Step title="确认收货" />
            </Steps>
          </Col>
          <Col span={18}>
            <Route exact path="/newOrder/confirm" render={() => ConfirmOrder()} />
            <Route exact path="/newOrder/pay" component={Pay} />
            <Route exact path="/newOrder/result" component={PayResult} />
          </Col>
        </Row>
      </div>
    );
  }
}

NewOrder.propTypes = {
  address: object,
  currentStep: number,
  history: object,
  location: object,
  newOrder: func,
  products: array,
  updateAddress: func,
  updateCurrentStep: func,
  updateProducts: func,
};

export default withRouter(NewOrder);
