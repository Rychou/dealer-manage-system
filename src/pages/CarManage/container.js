import { connect } from 'react-redux';
import CarManage from './component';
import { async, updatePagination } from './actions';

const { fetchCarsInfo, changeDrawerVisible, changeCarsInfo } = async;

const mapStateToProps = state => state.CarManage;

const mapDispatchToProps = dispatch => ({
    fetchCarsInfo: payload => dispatch(fetchCarsInfo(payload)),
    updatePagination: payload => dispatch(updatePagination(payload)),
    changeDrawerVisible: payload => dispatch(changeDrawerVisible(payload)),
    changeCarsInfo: payload => dispatch(changeCarsInfo(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CarManage);
