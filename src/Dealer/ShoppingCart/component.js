import React, { Component } from 'react';
import {
  Drawer,
  InputNumber,
  Button,
  Tooltip,
  Table,
  Row,
  Col,
  message,
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './index.less';

@hot(module)
class ShoppingCart extends Component {
  handleChange = (index, amount) => {
    this.props.updateProductAmount({ amount, index });
  };

  linkToNewProduct = () => {
    const {
      selectedAmount,
      history: { push },
      selectedProducts,
      toggleVisible,
      clearShoppingCart,
    } = this.props;
    if (selectedAmount) {
      toggleVisible();
      push('/newOrder/confirm', { products: selectedProducts });
      clearShoppingCart();
    } else {
      message.info('请选择需要结算的商品噢！');
    }
  };

  render() {
    const {
      toggleVisible,
      products,
      visible,
      selectProduct,
      selectedAmount,
      totalPrice,
    } = this.props;
    const columns = [
      {
        title: '预览图',
        dataIndex: 'carouselImages',
        render: (text, record) => (
          <img
            style={{ width: 40, height: 40 }}
            src={record.carouselImages[0]}
          />
        ),
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: (name, record) => (
          <Tooltip title="点击查看商品详情">
            <Link className="product-name" to={`/products/${record.no}`}>
              {name}
            </Link>
          </Tooltip>
        ),
        width: 150,
      },
      {
        title: '分类',
        dataIndex: 'categories',
        render: (text, record) => (
          <span>{record.categories[record.category]}</span>
        ),
        width: 80,
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price, record) => (
          <span>￥{(price * record.amount).toFixed(2)}</span>
        ),
        width: 100,
      },
      {
        title: '数量',
        dataIndex: 'amount',
        render: (amount, record, index) => (
          <div>
            <InputNumber
              style={{ width: 'fit-content' }}
              max={record.stocks}
              min={0}
              size="small"
              defaultValue={amount}
              onChange={this.handleChange.bind(this, index)}
            />
            <div style={{ textAlign: 'center', fontSize: 12, color: 'gray' }}>
              {amount <= record.stocks || !amount ? '有货' : '货量不足'}
            </div>
          </div>
        ),
        width: 80,
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedProducts) => {
        selectProduct({ selectedRowKeys, selectedProducts });
      },
    };

    return (
      <div className="shopping-cart-container">
        <Button
          className="shopping-cart-button"
          type="primary"
          shape="circle"
          icon="shopping-cart"
          onClick={toggleVisible}
        />
        <Drawer
          title="购物车"
          width={550}
          placement="right"
          closable
          onClose={toggleVisible}
          visible={visible}
        >
          <Table
            className="shopping-cart-table"
            rowKey="no"
            rowSelection={rowSelection}
            dataSource={products}
            columns={columns}
            style={{ marginBottom: 64 }}
            pagination={{ pageSize: 5 }}
            size="small"
          />
          <Row
            className="shopping-cart-footer"
            type="flex"
            justify="end"
            align="middle"
            gutter={16}
          >
            <Col span={6}>
              已选<span style={{ color: 'red' }}>{selectedAmount}</span>
              件商品
            </Col>
            <Col span={8}>
              总价：
              <span style={{ fontSize: 24, color: 'red' }}>￥{totalPrice}</span>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={this.linkToNewProduct}>
                去结算
              </Button>
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(ShoppingCart);
