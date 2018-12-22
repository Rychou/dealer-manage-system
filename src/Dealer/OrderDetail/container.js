import async from './actions';
import { connect } from 'react-redux';
import OrderDetail from './component';

const { fetchOrderDetail, updateDetailOrderStatus } = async;

const mapStateToProps = state => state.OrderDetail;

const mapDispatchToProps = dispatch => ({
  fetchOrderDetail: payload => dispatch(fetchOrderDetail(payload)),
  updateOrderStatus: payload => dispatch(updateDetailOrderStatus(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetail);
