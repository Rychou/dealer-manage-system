import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array } from 'prop-types';
// import { Row, Col, Card, List } from 'antd';
import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { orderStatus } from 'utils';
import './index.less';


// const { Meta } = Card;
// const {Item} = List;

// //const Price = ({ price }) => <span className="product-price">￥{price}</span>;
// const Id = ({id}) => <span className="order-id">NO.{id}</span>;
// const Price = ({ price }) => <span className="order-price">￥{price}</span>;

// const ProductList = ({productList}) => {
//   return <List
//     size = "small"
//     dataSource={productList}
//     renderItem={item =>(
//         <Link to={`/products/${item.productId}`}>
//           <Item><Item.Meta description={`${item.productName}:${item.productNum}`} /></Item>
//         </Link>
//     )}
//   />
// };

// const Status = ({status,logistics}) => {
//   const OrderStatus = orderStatus(status);
//   if(OrderStatus === "UNDEFINED") {return (<Col>{OrderStatus}</Col>);}
//   if(OrderStatus == "SHIPPED"){
//     return (
//       <span>
//         <Col className={OrderStatus}>{OrderStatus}</Col>
//         <Col>{`物流单号：${logistics.num}`}</Col>
//         <Col>{`当前物流信息：${logistics.message}`}</Col>
//       </span>
//     );
//   }
//   return (<Col className={OrderStatus}>{OrderStatus}</Col>);
// }

const insideColumns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '数量', dataIndex: 'num', key: 'num' },
    { title: '单价', dataIndex: 'price', key: 'price' },
    { title: '总价', dataIndex: 'totalPrice', key: 'totalPrice' },
  ];

const ProductList = (productList) => {
  
  // const {productList} = this.props;
  const data = [];
  productList.map((product,index) => {
    data.push({
      key: index,
      name: product.productName,
      num: product.productNum, // int
      price: product.productPrice, // float
      totalPrice: product.productPrice * product.productNum, // *
    })
  });
  return (data);
};

ProductList.propTypes = {
  productList: array,
};

const columns = [
            { title: '订单编号', dataIndex: 'no', key: 'no' },
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
            { title: '详细信息', key: 'operation', render: () => <a href="/products">详情</a> },
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
              products: ProductList(order.list),
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
              products: ProductList(order.list),
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




// const menu = (
//   <Menu>
//     <Menu.Item>
//       Action 1
//     </Menu.Item>
//     <Menu.Item>
//       Action 2
//     </Menu.Item>
//   </Menu>
// );

// function Orders() {
//   const expandedRowRender = () => {
//     const columns = [
//       { title: '名称', dataIndex: 'name', key: 'name' },
//       { title: '数量', key: 'num', key: 'num'},
//       { title: '单价', dataIndex: 'price', key: 'price' },
//       { title: '总价', dataIndex: 'totalPrice', key: 'totalPrice' },

//       // {
//       //   title: 'Action',
//       //   dataIndex: 'operation',
//       //   key: 'operation',
//       //   render: () => (
//       //     <span className="table-operation">
//       //       <a href="javascript:;">Pause</a>
//       //       <a href="javascript:;">Stop</a>
//       //       <Dropdown overlay={menu}>
//       //         <a href="javascript:;">
//       //           More <Icon type="down" />
//       //         </a>
//       //       </Dropdown>
//       //     </span>
//       //   ),
//       // },
//     ];

//     const data = [];
//     for (let i = 0; i < 3; ++i) {
//       data.push({
//         key: i,
//         date: '2014-12-24 23:12:00',
//         name: 'This is production name',
//         upgradeNum: 'Upgraded: 56',
//       });
//     }
//     return (
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={false}
//       />
//     );
//   };

//   const columns = [
//     { title: '订单编号', dataIndex: 'no', key: 'no' },
//     { title: '下单日期', dataIndex: 'date', key: 'date' },
//     { title: '订单价格', dataIndex: 'price', key: 'price' },
//     { title: '收货人', dataIndex: 'name', key: 'name' },
//     { title: '联系电话', dataIndex: 'phone', key: 'phone' },
//     { title: '配送地址', dataIndex: 'address', key: 'address' },
//     { title: '配送状态', dataIndex: 'status', key: 'status' },
//     { title: '详细信息', key: 'operation', render: () => <a href="javascript:;">详情</a> },
//   ];

//   const data = [];
//   for (let i = 0; i < 3; ++i) {
//     data.push({
//       key: i,
//       name: 'Screem',
//       platform: 'iOS',
//       version: '10.3.4.5654',
//       upgradeNum: 500,
//       creator: 'Jack',
//       createdAt: '2014-12-24 23:12:00',
//     });
//   }

//   return (
//     <Table
//       className="components-table-demo-nested"
//       columns={columns}
//       expandedRowRender={expandedRowRender}
//       dataSource={data}
//     />
//   );
// }
