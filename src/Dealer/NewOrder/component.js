import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Steps, Row, Col, Button } from 'antd';
import './index.less';
import Address from './Address';
import Products from './Products';
import Overview from './Overview';
import { hot } from 'react-hot-loader';
import { object, func } from 'prop-types';
import { Route } from 'react-router-dom';
import Pay from './Pay';
import PayResult from './PayResult';

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

  handleSumbitOrder = () => {
    this.props.updateCurrentStep(1);
    this.props.history.push('/newOrder/pay');
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
      <div className="new-order-container">
        <Row>
          <Col span={6}>
            <Steps
              direction="vertical"
              current={currentStep}
              size="small"
              style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}
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
  location: object,
  updateAddress: func,
  updateProducts: func,
};

export default withRouter(NewOrder);
