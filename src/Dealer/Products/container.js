import { async } from './actions';
import { connect } from 'react-redux';
import Products from './component';

const { fetchProducts } = async;

const mapStateToProps = state => state.Products;

const mapDistpachToProps = dispatch => ({
  fetchProducts: payload => dispatch(fetchProducts(payload)),
});

export default connect(
  mapStateToProps,
  mapDistpachToProps,
)(Products);
