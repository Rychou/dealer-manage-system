import { async } from './actions';
import { connect } from 'react-redux';
import OrderDetail from './component';

const { fetchOrderDetail, updateOrderStatus } = async;

const mapStateToProps = state => state.OrderDetail;

const mapDispatchToProps = dispatch => ({
  fetchOrderDetail: payload => dispatch(fetchOrderDetail(payload)),
  updateOrderStatus: payload => dispatch(updateOrderStatus(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetail);
