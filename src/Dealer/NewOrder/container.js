import { connect } from 'react-redux';
import NewOrder from './component';
import {
  async,
  updateProducts,
  updateAddress,
  updateCurrentStep,
} from './actions';

const { newOrder } = async;
const mapStateToProps = state => state.NewOrder;

const mapDispatchToPropd = dispatch => ({
  newOrder: payload => dispatch(newOrder(payload)),
  updateProducts: payload => dispatch(updateProducts(payload)),
  updateAddress: payload => dispatch(updateAddress(payload)),
  updateCurrentStep: payload => dispatch(updateCurrentStep(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToPropd,
)(NewOrder);
