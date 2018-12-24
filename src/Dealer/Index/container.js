import async from './actions';
import { connect } from 'react-redux';
import Orders from './component';

const { fetchOrders, updateOrderStatus, payOrder } = async;

const mapStateToProps = state => state.Orders;

const mapDistpachToProps = dispatch => ({
  fetchOrders: payload => dispatch(fetchOrders(payload)),
  updateOrderStatus: payload => dispatch(updateOrderStatus(payload)),
  payOrder: payload => dispatch(payOrder(payload)),
});

export default connect(
  mapStateToProps,
  mapDistpachToProps,
)(Orders);
