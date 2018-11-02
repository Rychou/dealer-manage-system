import { connect } from 'react-redux';
import BusDetail from './component';
import { async } from './actions';

const { fetchBusInfo, fetchChargeRecord } = async;


const mapStateToProps = state => state.BusDetail;

const mapDispatchToProps = dispatch => ({
  fetchBusInfo: payload => dispatch(fetchBusInfo(payload)),
  fetchChargeRecord: payload => dispatch(fetchChargeRecord(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusDetail);
