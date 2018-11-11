import { connect } from 'react-redux';
import Map from './component';
import { async, UPDATE_INFOWINDOW } from './actions';

const { fetchMapData, fetchBusInfo } = async;
const mapStateToProps = state => state.Map;

const mapDispatchToProps = dispatch => ({
  fetchMapData: payload => dispatch(fetchMapData(payload)),
  fetchBusInfo: payload => dispatch(fetchBusInfo(payload)),
  updateInfoWindow: payload => dispatch({ type: UPDATE_INFOWINDOW, payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
