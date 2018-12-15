import { async } from './actions';
import { connect } from 'react-redux';
import Stock from './component';

const { fetchStocks } = async;

const mapStateToProps = state => state.Stock;

const mapDispatchToProps = dispatch => ({
  fetchStocks: payload => dispatch(fetchStocks(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stock);
