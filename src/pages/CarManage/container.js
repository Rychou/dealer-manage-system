import { connect } from 'react-redux';
import CarManage from './component';
import { async, updatePagination } from './actions';

const { fetchCarsInfo } = async;

const mapStateToProps = state => state.CarManage;

const mapDispatchToProps = dispatch => ({
    fetchCarsInfo: payload => dispatch(fetchCarsInfo(payload)),
    updatePagination: payload => dispatch(updatePagination(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CarManage);
