import { connect } from 'react-redux';
import BusReport from './component';

const mapStateToProps = state => state.busReport;

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BusReport);
