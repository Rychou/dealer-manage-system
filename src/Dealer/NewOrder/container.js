import { connect } from 'react-redux';
import NewOrder from './component';
import { updateProducts, updateAddress } from './actions';

const mapStateToProps = state => state.NewOrder;

const mapDispatchToPropd = dispatch => ({
  updateProducts: payload => dispatch(updateProducts(payload)),
  updateAddress: payload => dispatch(updateAddress(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToPropd,
)(NewOrder);
