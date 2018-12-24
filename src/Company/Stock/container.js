import { async } from './actions';
import { connect } from 'react-redux';
import Stock from './component';

const { fetchStocks, setStock } = async;

const mapStateToProps = state => state.Stock;

const mapDispatchToProps = dispatch => ({
  fetchStocks: payload => dispatch(fetchStocks(payload)),
  setStock: payload => dispatch(setStock(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stock);
