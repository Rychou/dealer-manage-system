import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, array } from 'prop-types';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

const { Meta } = Card;

const Price = ({ price }) => <span className="product-price">￥{price}</span>;

@hot(module)
class Products extends Component {
  componentDidMount() {
    const { fetchProducts, isResolved } = this.props;
    if (!isResolved) {
      fetchProducts();
    }
  }

  render() {
    const { products } = this.props;

    const ProductList = () => {
      return products.length
        ? products.map((product, index) => (
            <Col span="6" style={{ marginTop: '24px' }} key={index}>
              <Link to={`/products/${product.no}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={product.imageUrl} />}
                >
                  <Meta title={<Price price={product.price} />} description={product.name} />
                </Card>
              </Link>
            </Col>
          ))
        : null;
    };

    return (
      <Row type="flex" justify="center" style={{ padding: '12px' }}>
        {ProductList()}
      </Row>
    );
  }
}

Products.propTypes = {
  fetchProducts: func,
  isFetching: bool,
  isResolved: bool,
  products: array,
};

export default Products;
