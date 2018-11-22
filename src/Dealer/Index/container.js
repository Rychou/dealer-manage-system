import { async } from './actions';
import { connect } from 'react-redux';
import Orders from './component';

const { fetchProducts } = async;

const mapStateToProps = state => state.Orders;

const mapDistpachToProps = dispatch => ({
  fetchOrders: payload => dispatch(fetchOrders(payload)),
});

export default connect(
  mapStateToProps,
  mapDistpachToProps,
)(Orders);
