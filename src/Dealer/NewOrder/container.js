import { connect } from 'react-redux';
import NewOrder from './component';
import { updateProducts, updateAddress, updateCurrentStep } from './actions';

const mapStateToProps = state => state.NewOrder;

const mapDispatchToPropd = dispatch => ({
  updateProducts: payload => dispatch(updateProducts(payload)),
  updateAddress: payload => dispatch(updateAddress(payload)),
  updateCurrentStep: payload => dispatch(updateCurrentStep(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToPropd,
)(NewOrder);
