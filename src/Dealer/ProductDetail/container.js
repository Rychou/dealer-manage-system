import { async } from './actions';
import { connect } from 'react-redux';
import ProductDetail from './component';

const { fetchProductDetail } = async;

const mapStateToProps = state => state.ProductDetail;

const mapDispatchToProps = dispatch => ({
  fetchProductDetail: payload => dispatch(fetchProductDetail(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetail);
