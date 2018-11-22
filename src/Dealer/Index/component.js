import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array } from 'prop-types';
import { Row, Col, Card } from 'antd';
import './index.less';

const { Meta } = Card;

//const Price = ({ price }) => <span className="product-price">￥{price}</span>;
const Id = ({id}) => <span className="order-id">NO.{id}</span>;
const Price = ({ price }) => <span className="order-price">￥{price}</span>;


@hot(module)
class Orders extends Component {
  componentDidMount() {
    const { fetchOrders, isResolved } = this.props;
    if (!isResolved) {
      fetchOrders({dealerId:"dealer01"});
    }
  }

  render() {
    const { orders } = this.props;

    const OrderList = () => {
      return orders.length
        ? orders.map((order, index) => (
            <Col span="6" key={index} style={{ marginTop: '24px' }}>
              <Card
                hoverable
                style={{ width: 240 }}
                // cover={<img alt="example" src={order.imageUrl} />}
              >
                <Meta title={<Id id={order.id} />} />
                <Meta title={<Price price={order.price} />} />                
              </Card>
            </Col>
          ))
        : null;
    };

    return (
      <Row type="flex" justify="center" style={{ padding: '12px' }}>
        {OrderList()}
      </Row>
    );
  }
}

Orders.propTypes = {
  fetchOrders: func,
  isFetching: bool,
  isResolved: bool,
  orders: array,
};

export default Orders;
