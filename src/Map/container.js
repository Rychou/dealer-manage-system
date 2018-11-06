import { connect } from 'react-redux';
import Map from './component';
import { async } from './actions';

const { fetchMapData } = async;
const mapStateToProps = state => state.Map;

const mapDispatchToProps = dispatch => ({
  fetchMapData: payload => dispatch(fetchMapData(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
