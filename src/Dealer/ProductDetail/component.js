import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, number } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, BackTop } from 'antd';
import Preview from './Preview';
import BuyForm from './BuyForm';
import './index.less';

@hot(module)
class ProductDetail extends Component {
  componentDidMount() {
    const {
      isResolve,
      fetchProductDetail,
      match: {
        params: { no },
      },
    } = this.props;
    fetchProductDetail({ no });
  }

  render() {
    const { product } = this.props;
    return (
      <div className="product-container">
        <BackTop />
        <Row gutter={16}>
          <Col span={8}>
            <Preview images={product.carouselImages} />
          </Col>
          <Col span={16}>
            <BuyForm product={product} />
          </Col>
        </Row>
        <div className="product-detail">
          {product.detailImages
            ? product.detailImages.map((image, index) => <img key={index} src={image} />)
            : null}
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  fetchProductDetail: func,
  isResolve: bool,
};

export default withRouter(ProductDetail);
