import { async } from './actions';
import { connect } from 'react-redux';
import Orders from './component';

const { fetchOrders, updateCompanyOrderStatus, linkExpress } = async;

const mapStateToProps = state => state.Orders;

const mapDistpachToProps = dispatch => ({
  fetchOrders: payload => dispatch(fetchOrders(payload)),
  updateCompanyOrderStatus: payload => dispatch(updateCompanyOrderStatus(payload)),
  linkExpress: payload => dispatch(linkExpress(payload)),
});

export default connect(
  mapStateToProps,
  mapDistpachToProps,
)(Orders);
