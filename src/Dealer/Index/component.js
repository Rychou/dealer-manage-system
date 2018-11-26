import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array } from 'prop-types';
import { Row, Col, Card, List } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';


const { Meta } = Card;
const {Item} = List;

//const Price = ({ price }) => <span className="product-price">￥{price}</span>;
const Id = ({id}) => <span className="order-id">NO.{id}</span>;
const Price = ({ price }) => <span className="order-price">￥{price}</span>;

const ProductList = ({productList}) => {
  return <List
    itemLayout="horizontal"
    dataSource={productList}
    renderItem={item =>(
        <Link to={`/products/${item.productId}`}>
          <Item><Item.Meta description={`${item.productName}:${item.productNum}`} /></Item>
        </Link>
    )}
  />
};






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
                         {/*ToDo:
                            添加判断，
                            switch(status):
                                case "未付款" : print "未付款";break;
                                case "集团未确认" : print "已付款，等待集团确认";break;
                                case "已发货" : print "order.logistics";break;
                        */}
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
