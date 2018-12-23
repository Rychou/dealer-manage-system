import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array, object } from 'prop-types';
import { Table, Input, Button, Icon, Modal, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { orderStatus } from 'utils';
import ExpressForm from './ExpressForm';
import moment from 'moment';
import './index.less';

const Confirm = Modal.confirm;

const Address = (address) => {
  if (address) {
      return (
          <Tooltip
              title={
                  `${address.province} 
                  ${address.city} 
                  ${address.district} 
                  ${address.street} 
                  ${address.details}`
              }
          ><span>{address.province} {address.city} {address.district} {address.street}</span>
          </Tooltip>

      );
  }
  return null;
};

const orderData = (orders) => {
  const data = [];
  if (orders.length) {
    orders.map((order, index) => {
      const status = orderStatus(order.orderStatus);
      const { address } = order;
      const addressMsg = Address(address);
      data.push({
        key: index,
        id: order.id,
        date: moment(order.orderedAt).format('YYYY-MM-DD HH:mm:ss'),
        price: order.orderTotalPrice,
        name: order.dealer.name,
        phone: order.phone,
        address: addressMsg,
        statusNum: order.orderStatus,
        status,
      });
      return true;
    });
  }
  return data;
};

@hot(module)
class Orders extends Component {
  columns = [
    { title: '订单编号', dataIndex: 'id', key: 'id' },
    {
      title: '下单日期',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    },
    { title: '订单价格', dataIndex: 'price', key: 'price' },
    {
      title: '经销商',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={(ele) => { this.searchInput = ele; return true; }}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered =>
            <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
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
      filterMultiple: true,
      onFilter: (value, record) => record.statusNum === value },
    { title: '详细信息', key: 'info', render: (record) => <Link to={`/orders/${record.id}`}>详情</Link> },
    { title: '操作',
      key: 'operation',
      render: (record) => {
        if (record.statusNum === 1) {
          return (
            <Button
                type="primary"
                id="comfirmed"
                onClick={this.confirmOrder.bind(this, record.id)}
            >确认订单
            </Button>
          );
        }
        if (record.statusNum === 2) {
          return (
            <div>
              <Button
                  type="primary"
                  id="link"
                  onClick={this.handleShowModal.bind(this, record.id)}
              >关联物流
              </Button>
              <ExpressForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
              />
            </div>
          );
        }
        return null;
      },
    },
  ];

  state = {
    searchText: '',
    visible: false,
    selectedId: '',
  };

  componentDidMount() {
    const { fetchOrders, isResolved } = this.props;
    if (!isResolved) {
      fetchOrders();
    }
  }


  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleShowModal = (id) => {
    this.setState({ visible: true, selectedId: id });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const {
        linkExpress,
        fetchOrders,
      } = this.props;
      const id = this.state.selectedId;
      const { expressNumber } = values;
      linkExpress({ id, expressNumber, status: 3, fetchOrders });
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

    confirmOrder = id => {
        Confirm({
            title: '是否确认订单？',
            onOk: () => {
                const {
                    updateCompanyOrderStatus,
                    fetchOrders,
                } = this.props;
                updateCompanyOrderStatus({ id, status: 2, fetchOrders });
            },
        });
    }


  render() {
    const { orders, isFetching } = this.props.CompanyOrders;
    return (
      <Table
      loading={isFetching}
        className="orderList"
        columns={this.columns}
        dataSource={orderData(orders)}
        style={{ width: 1250 }}
      />
    );
  }
}

Orders.propTypes = {
  CompanyOrders: object,
  fetchCompanyOrders: func,
  fetchOrders: func,
  isResolved: bool,
  linkExpress: func,
  orders: array,
  updateCompanyOrderStatus: func,
};

export default Orders;
