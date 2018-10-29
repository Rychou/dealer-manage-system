import { connect } from 'react-redux';
import BusDetail from './component';
import { async } from './actions';

const { fetchBusDetail } = async;

const mapStateToProps = state => state.busDetail;

const mapDispatchToProps = dispatch => ({
  fetchBusDetail: payload => dispatch(fetchBusDetail(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusDetail);
