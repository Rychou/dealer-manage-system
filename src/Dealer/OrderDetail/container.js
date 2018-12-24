import async from './actions';
import { connect } from 'react-redux';
import OrderDetail from './component';

const { fetchOrderDetail, updateDetailOrderStatus, payDetailOrder } = async;

const mapStateToProps = state => state.OrderDetail;

const mapDispatchToProps = dispatch => ({
  fetchOrderDetail: payload => dispatch(fetchOrderDetail(payload)),
  updateOrderStatus: payload => dispatch(updateDetailOrderStatus(payload)),
  payDetailOrder: payload => dispatch(payDetailOrder(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetail);
