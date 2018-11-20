import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool, func, number } from 'prop-types';
import { withRouter } from 'react-router-dom';

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
    return <div>详细信息</div>;
  }
}

ProductDetail.propTypes = {
  fetchProductDetail: func,
  id: number,
  isResolve: bool,
};

export default withRouter(ProductDetail);
