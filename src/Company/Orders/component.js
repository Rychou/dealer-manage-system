import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array } from 'prop-types';
import { Table, Input, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { orderStatus } from 'utils';
import './index.less';


// const ProductList = (productList) => {
//   const data = [];
//   productList.map((product, index) => {
//     data.push({
//       key: index,
//       name: <Link to={`/products/${product.id}`}>{product.name}</Link>,
//       num: product.num, // int
//       price: product.price, // float
//       totalPrice: product.price * product.num, // *
//     });
//   });
//   return (data);
// };

// ProductList.propTypes = {
//   productList: array,
// };

const state = {
  searchText: '',
};

const handleSearch = (selectedKeys, confirm) => () => {
  confirm();
  this.setState({ searchText: selectedKeys[0] });
};

const handleReset = clearFilters => () => {
  clearFilters();
  this.setState({ searchText: '' });
};


@hot(module)
class Orders extends Component {
  columns = [
    { title: '订单编号', dataIndex: 'no', key: 'no' },
    {
      title: '下单日期',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    },
    { title: '订单价格', dataIndex: 'price', key: 'price' },
    // { title: '经销商', dataIndex: 'name', key: 'name' },
    {
      title: '经销商',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
            // style={{ width: 200 }}
            // style={{ width: 200, marginLeft: 200, position: 'absolute' }}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(${searchText})`, 'gi')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </span>
        ) : text;
      },
    },
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
      onFilter: (value, record) => record.statusNum == value },
    // { title: '物流信息', dataIndex: 'logistics', key: 'logistics' },
    { title: '详细信息', key: 'operation', render: (record) => <Link to={`/orders/${record.no}`}>详情</Link> },
  ];


  componentDidMount() {
    const { fetchOrders, isResolved } = this.props;
    if (!isResolved) {
      fetchOrders();
    }
  }

  state = {
    searchText: '',
  };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { orders } = this.props;
    const data = [];
    // const table = [];
    orders.length
        ? orders.map((order, index) => {
          const status = orderStatus(order.status);

        data.push({
          key: index,
          no: order.id,
          date: order.date,
          price: order.price,
          name: order.dealer,
          phone: order.phone,
          address: order.address,
          statusNum: order.status,
          status,
          // products: ProductList(order.products),
        });
      })
      : null;

    return (
      // OrderList()
      <Table
        className="orderList"
        columns={this.columns}
        dataSource={data}
        style={{ width: 1250 }}
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
