import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array } from 'prop-types';
import { Table, Input, Button, Icon, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { orderStatus } from 'utils';
import ExpressForm from './ExpressForm';
import './index.less';

const Confirm = Modal.confirm;

const orderData = (orders) => {
  const data = [];
  if (orders.length) {
    orders.map((order, index) => {
      const status = orderStatus(order.status);
      data.push({
        key: index,
        id: order.id,
        date: order.date,
        price: order.price,
        name: order.dealer,
        phone: order.phone,
        address: order.address,
        statusNum: order.status,
        status,
      });
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
      onFilter: (value, record) => record.statusNum == value },
    { title: '详细信息', key: 'info', render: (record) => <Link to={`/orders/${record.id}`}>详情</Link> },
    { title: '操作',
      key: 'operation',
      render: (record) => {
        if (record.statusNum == 1) {
          return (
            <Button
                type="primary"
                id="comfirmed"
                onClick={this.confirmOrder(record.id)}
            >确认订单
            </Button>
          );
        }
        if (record.statusNum == 2) {
          return (
            <div>
              <Button
                  type="primary"
                  id="link"
                  onClick={this.handleShowModal(record.id)}
              >关联物流
              </Button>
              {/* <linkExpress /> */}
              <ExpressForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
              />
            </div>
          );
        }
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
      } = this.props;
      const id = this.state.selectedId;
      const { expressNumber } = values;
      linkExpress({ id, expressNumber, status: 3 });
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

    confirmOrder = id => {
        // const id = props.id || {};
        Confirm({
            title: '是否确认订单？',
            onOk: () => {
                const {
                    updateCompanyOrderStatus,
                } = this.props;
                updateCompanyOrderStatus({ id, status: 2 });
            },
        });
    }


  render() {
    const { orders } = this.props.CompanyOrders;
    return (
      // OrderList()
      <Table
        className="orderList"
        columns={this.columns}
        dataSource={orderData(orders)}
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
