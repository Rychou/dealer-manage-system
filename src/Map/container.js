import { connect } from 'react-redux';
import Map from './component';
import { async } from './actions';

const { fetchMapData, fetchBusInfo } = async;
const mapStateToProps = state => state.Map;

const mapDispatchToProps = dispatch => ({
  fetchMapData: payload => dispatch(fetchMapData(payload)),
  fetchBusInfo: payload => dispatch(fetchBusInfo(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
