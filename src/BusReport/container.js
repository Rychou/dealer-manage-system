import { connect } from 'react-redux';
import BusReport from './component';
import async from './actions';

const { fetchReport, updatePagination } = async;

const mapStateToProps = state => state.busReport;

const mapDispatchToProps = dispatch => ({
  fetchReport: payload => dispatch(fetchReport(payload)),
  updatePagination: payload => dispatch(updatePagination(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BusReport);
