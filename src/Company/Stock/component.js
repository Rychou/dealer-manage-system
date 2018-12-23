import React, { Component } from 'react';
import { Table } from 'antd';
import { hot } from 'react-hot-loader';
import ModifyStock from './ModifyStock';

@hot(module)
class Stock extends Component {
  state = {
    selectedProductNo: null,
    visible: false,
  };

  componentDidMount() {
    this.props.fetchStocks();
  }

  handleModifyStock = productNo => {
    this.setState({
      visible: true,
      selectedProductNo: productNo,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { isFetching, stocks } = this.props;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '商品单价(元)',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: '库存量(件)',
        dataIndex: 'stock',
        key: 'stock',
        sorter: (a, b) => a.stock - b.stock,
      },
      {
        title: '仓库名称',
        dataIndex: 'warehouseName',
        key: 'warehouseName',
      },
      {
        title: '仓库地址',
        dataIndex: 'warehouseAddress',
        key: 'warehouseAddress',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <a href="javascript:;" onClick={this.handleModifyStock.bind(this, record.productNo)}>
            修改库存
          </a>
        ),
      },
    ];
    return (
      <div style={{ backgroundColor: '#fff', padding: 12 }}>
        <Table rowKey="productNo" loading={isFetching} dataSource={stocks} columns={columns} />
        <ModifyStock
          fetchStocks={this.props.fetchStocks}
          hideModal={this.hideModal}
          productNo={this.state.selectedProductNo}
          visible={this.state.visible}
          stocks={stocks}
        />
      </div>
    );
  }
}

export default Stock;
