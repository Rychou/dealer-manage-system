import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array, object } from 'prop-types';
import { Table, Button, Modal, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { orderStatus } from 'utils';
import moment from 'moment';
import './index.less';

const { confirm } = Modal;

const insideColumns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '数量', dataIndex: 'num', key: 'num' },
    { title: '单价', dataIndex: 'price', key: 'price' },
    { title: '总价', dataIndex: 'totalPrice', key: 'totalPrice' },
  ];

const ProductList = (orderDetails) => {
  const data = [];
  if (orderDetails) {
    orderDetails.map((product, index) => {
      const productInfo = product.product;
      data.push({
        key: index,
        name: <Link to={`/products/${productInfo.no}`}>{productInfo.name}</Link>,
        num: product.amount, // int
        price: productInfo.price, // float
        totalPrice: product.totalMoney, // *
      });
      return true;
    });
  }

  return (data);
};

ProductList.propTypes = {
  orderDetails: array,
};

const orderData = (orders) => {
  const data = [];
  if (orders) {
    if (orders.length) {
      orders.map((order, index) => {
        const status = orderStatus(order.orderStatus);
        const { address } = order;
        const addressMsg = `${address.province} ${address.city} ${address.district}`;
        if (status === '已发货') {
          data.push({
            key: index,
            id: order.orderNo,
            date: moment(order.orderedAt).format('YYYY-MM-DD HH:mm:ss'),
            price: order.orderTotalPrice,
            name: order.dealer.name,
            phone: order.phone,
            address: addressMsg,
            statusNum: order.orderStatus,
            status,
            products: ProductList(order.orderDetails),
          });
        } else {
          data.push({
            key: index,
            id: order.orderNo,
            date: moment(order.orderedAt).format('YYYY-MM-DD HH:mm:ss'),
            price: order.orderTotalPrice,
            name: order.dealer.name,
            phone: order.phone,
            address: addressMsg,
            statusNum: order.orderStatus,
            status,
            products: ProductList(order.orderDetails),
          });
        }
        return true;
      });
    }
  }

  return data;
};


@hot(module)
class Orders extends Component {
  state = {
    loading: true,
  }

  columns = [
    {
      title: '下单日期',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    },
    { title: '订单价格', dataIndex: 'price', key: 'price' },
    { title: '收货人', dataIndex: 'name', key: 'name' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
    { title: '配送地址', dataIndex: 'address', key: 'address' },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      filters: [{
        text: '未付款',
        value: 0,
      }, {
        text: '已付款',
        value: 1,
      }, {
        text: '集团已确认',
        value: 2,
      }, {
        text: '已发货',
        value: 3,
      }, {
        text: '已签收',
        value: 4,
      }, {
        text: '交易完成',
        value: 5,
      }, {
        text: '退货申请中',
        value: 6,
      }, {
        text: '退货中',
        value: 7,
      }, {
        text: '已退货',
        value: 8,
      }, {
        text: '取消交易',
        value: 9,
      }],
      filterMultiple: true,
      onFilter: (value, record) => record.statusNum === value },
    // { title: '物流信息', dataIndex: 'logistics', key: 'logistics' },
    { title: '详细信息', key: 'info', render: (record) => <Link to={`/orders/${record.id}`}>详情</Link> },
    { title: '操作',
      key: 'operation',
      render: (record) => {
        if (record.statusNum === 4) {
          return (
            <Button
                type="primary"
                onClick={this.comfirmOrders.bind(this, record.id)}
            >确认收货
            </Button>
          );
        }
        return null;
      },
    },
  ];

  componentDidMount() {
    const { fetchOrders, isResolved } = this.props;
    if (!isResolved) {
      fetchOrders();
      this.setState({ loading: false });
    }
  }

  comfirmOrder (id) {
    confirm({
        title: '是否确认收货？',
        onOk: () => {
            const {
                updateOrderStatus,
            } = this.props;
            updateOrderStatus({ id, status: 5 });
        },
    });
  }


  render() {
    const { orders } = this.props.Orders || {};
    return (
      <Spin spinning={this.state.loading}>
          <Table
            className="orderList"
            columns={this.columns}
            expandedRowRender={record => <Table
                className="products"
                columns={insideColumns}
                dataSource={record.products}
                pagination={false}
              />}
            dataSource={orderData(orders)}
            style={{ backgroundColor: 'white', width: 1250 }}
          />
      </Spin>

    );
  }
}

Orders.propTypes = {
  fetchOrders: func,
  isResolved: bool,
  Orders: object,
  updateOrderStatus: func,
};

export default Orders;
