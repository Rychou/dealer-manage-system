import async from './actions';
import { connect } from 'react-redux';
import Orders from './component';

const { fetchCompanyOrders, updateCompanyOrderStatus, linkExpress } = async;

const mapStateToProps = state => state.Orders;

const mapDistpachToProps = dispatch => ({
  fetchOrders: payload => dispatch(fetchCompanyOrders(payload)),
  updateCompanyOrderStatus: payload => dispatch(updateCompanyOrderStatus(payload)),
  linkExpress: payload => dispatch(linkExpress(payload)),
});

export default connect(
  mapStateToProps,
  mapDistpachToProps,
)(Orders);
