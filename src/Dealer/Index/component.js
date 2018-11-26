import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array } from 'prop-types';
import { Row, Col, Card, List } from 'antd';
import { Link } from 'react-router-dom';
import { orderStatus } from 'utils';
import './index.less';


const { Meta } = Card;
const {Item} = List;

//const Price = ({ price }) => <span className="product-price">￥{price}</span>;
const Id = ({id}) => <span className="order-id">NO.{id}</span>;
const Price = ({ price }) => <span className="order-price">￥{price}</span>;

const ProductList = ({productList}) => {
  return <List
    size = "small"
    dataSource={productList}
    renderItem={item =>(
        <Link to={`/products/${item.productId}`}>
          <Item><Item.Meta description={`${item.productName}:${item.productNum}`} /></Item>
        </Link>
    )}
  />
};

const Status = ({status,logistics}) => {
  const OrderStatus = orderStatus(status);
  if(OrderStatus === "NotFound") {return (<Col>{OrderStatus}</Col>);}
  if(OrderStatus === "已发货"){
    return (
      <span>
        <Col>{OrderStatus}</Col>
        <Col>{`物流单号：${logistics.num}`}</Col>
        <Col>{`当前物流信息：${logistics.message}`}</Col>
      </span>
    );
  }
  return (<Col>{OrderStatus}</Col>);
}




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
                <ProductList productList={order.list} />  
                <Meta title={<Status status={order.status} logistics={order.logistics} />} />
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
