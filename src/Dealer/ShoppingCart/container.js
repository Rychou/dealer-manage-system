import { connect } from 'react-redux';
import ShoppingCart from './component';
import { toggleVisible, addProduct, updateProductAmount, selectProduct } from './actions';

const mapStateToProps = state => state.ShoppingCart;

const mapDispatchToProps = dispatch => ({
  toggleVisible: payload => dispatch(toggleVisible(payload)),
  addProduct: payload => dispatch(addProduct(payload)),
  updateProductAmount: payload => dispatch(updateProductAmount(payload)),
  selectProduct: payload => dispatch(selectProduct(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingCart);
