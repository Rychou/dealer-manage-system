import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array } from 'prop-types';
import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { orderStatus } from 'utils';
import './index.less';


const insideColumns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '数量', dataIndex: 'num', key: 'num' },
    { title: '单价', dataIndex: 'price', key: 'price' },
    { title: '总价', dataIndex: 'totalPrice', key: 'totalPrice' },
  ];

const ProductList = (productList) => {
  
  const data = [];
  productList.map((product,index) => {
    data.push({
      key: index,
      name: <Link to={`/products/${product.id}`}>{product.name}</Link>,
      num: product.num, // int
      price: product.price, // float
      totalPrice: product.price * product.num, // *
    })
  });
  return (data);
};

ProductList.propTypes = {
  productList: array,
};

const columns = [
            // { title: '订单编号', dataIndex: 'no', key: 'no' },
            { 
              title: '下单日期', 
              dataIndex: 'date', 
              key: 'date' ,
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
              key: 'status' ,
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
              },  {
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
              // 0-未付款
              // 1-已付款
              // 2-集团确认
              // 3-已发货
              // 4-已签收
              // 5-交易完成
              // 6-退货申请
              // 7-退货中
              // 8-已退货
              // 9-取消交易
              filterMultiple: true,
              onFilter: (value, record) => record.statusNum == value,},
            { title: '物流信息', dataIndex: 'logistics', key: 'logistics' },
            { title: '详细信息', key: 'operation', render: (record) => <Link to={`/orders/${record.no}`}>详情</Link> },
          ];


@hot(module)
class Orders extends Component {
  componentDidMount() {
    const { fetchOrders, isResolved } = this.props;
    if (!isResolved) {
      fetchOrders();
    }
  }

  render() {
    const { orders } = this.props;
    const data = [];
    // const table = [];
    orders.length
        ? orders.map((order, index) => { 
          
          const status = orderStatus(order.status);
          if(status == "已发货") {
            data.push({
              key: index,
              no: order.id,
              date: order.date,
              price: order.price,
              name: order.name,
              phone: order.phone,
              address: order.address,
              statusNum: order.status,
              status: status,
              logistics: order.logistics.message,
              // status: order.logistics.message,
              products: ProductList(order.products),
            });
          } else {
            data.push({
              key: index,
              no: order.id,
              date: order.date,
              price: order.price,
              name: order.name,
              phone: order.phone,
              address: order.address,
              statusNum: order.status,              
              status: status,
              products: ProductList(order.products),
            });
          }
          // return (data);
          // table.push(ProductList(order.list));
        })
        : null;

    return (
      // OrderList()
      <Table
        className="orderList"
        columns={columns}
        expandedRowRender={record => <Table
            className="products"
            columns={insideColumns}
            dataSource={record.products}
            pagination={false}
          />}
        dataSource={data}
      />
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
