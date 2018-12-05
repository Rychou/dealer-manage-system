import { async } from './actions';
import { connect } from 'react-redux';
import OrderDetail from './component';

const { fetchOrderDetail } = async;

const mapStateToProps = state => state.OrderDetail;

const mapDispatchToProps = dispatch => ({
  fetchOrderDetail: payload => dispatch(fetchOrderDetail(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetail);
