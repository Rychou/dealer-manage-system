import React, { Component } from 'react';
import { array } from 'prop-types';
import { Table } from 'antd';
import { hot } from 'react-hot-loader';

@hot(module)
class Products extends Component {
  render() {
    const { products } = this.props;
    const columns = [
      {
        title: '预览图',
        dataIndex: 'image',
        key: 'image',
        render: (text, record) => <img style={{ width: 48 }} src={record.carouselImages[0]} />,
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品属性',
        dataIndex: 'categories',
        key: 'categories',
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '小计',
        key: 'total',
        render: (text, record) => (
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {(record.price * record.amount).toFixed(2)}
          </span>
        ),
      },
    ];
    return <Table rowKey={name} dataSource={products} columns={columns} />;
  }
}

Products.propTypes = {
  products: array.isRequired,
};

export default Products;
