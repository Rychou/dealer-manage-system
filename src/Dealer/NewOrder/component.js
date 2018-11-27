import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Steps, Row, Col, Button } from 'antd';
import './index.less';
import Address from './Address';
import Products from './Products';
import Overview from './Overview';
import { hot } from 'react-hot-loader';
import { object, array, func } from 'prop-types';

const Step = Steps.Step;

@hot(module)
class NewOrder extends Component {
  componentDidMount() {
    const {
      updateProducts,
      location: { state },
    } = this.props;
    updateProducts(state.products);
  }

  handleSumbitOrder = () => {};

  render() {
    const {
      updateAddress,
      location: { state },
      address,
    } = this.props;
    return (
      <div className="new-order-container">
        <Row>
          <Col span={6}>
            <Steps direction="vertical" current={0} size="small">
              <Step title="确认订单" description="确认你的订单信息" />
              <Step title="付款" description="" />
              <Step title="确认收货" />
            </Steps>
          </Col>
          <Col span={18}>
            <Address updateAddress={updateAddress} />
            <Products products={state.products} />
            <Overview address={address} products={state.products} />
          </Col>
          <Button className="submit-order" onClick={this.handleSumbitOrder}>
            提交订单
          </Button>
        </Row>
      </div>
    );
  }
}

NewOrder.propTypes = {
  address: object,
  location: object,
  products: array,
  updateAddress: func,
  updateProducts: func,
};

export default withRouter(NewOrder);
