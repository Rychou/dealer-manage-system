import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, number } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Carousel } from 'antd';
import './index.less';

@hot(module)
class ProductDetail extends Component {
  componentDidMount() {
    const {
      isResolve,
      fetchProductDetail,
      match: {
        params: { id },
      },
    } = this.props;
    if (!isResolve) {
      fetchProductDetail(id);
    }
  }

  render() {
    const { product } = this.props;
    return (
      <Carousel className="carousel" autoplay>
        {product.images
          ? product.images.map((image, index) => {
              return <img src={image} alt="" key={index} />;
            })
          : null}
      </Carousel>
    );
  }
}

ProductDetail.propTypes = {
  fetchProductDetail: func,
  id: number,
  isResolve: bool,
};

export default withRouter(ProductDetail);
