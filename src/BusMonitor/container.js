import { connect } from 'react-redux';
import Monitors from './component';
import { async, updatePagination } from './actions';

const { fetchMonitors } = async;

const mapStateToProps = state => state.BusMonitor;

const mapDispatchToProps = dispatch => ({
  fetchMonitors: payload => dispatch(fetchMonitors(payload)),
  updatePagination: payload => dispatch(updatePagination(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Monitors);
