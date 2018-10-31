import { connect } from 'react-redux';
import BusManage from './component';
import { async, updatePagination } from './actions';

const {
    fetchBusInfo,
    changeDrawerVisible,
    changeBusInfo,
    postSpecialBusInfo,
    changeIsNewBus,
} = async;

const mapStateToProps = state => state.buses;

const mapDispatchToProps = dispatch => ({
    fetchBusInfo: payload => dispatch(fetchBusInfo(payload)),
    updatePagination: payload => dispatch(updatePagination(payload)),
    changeDrawerVisible: payload => dispatch(changeDrawerVisible(payload)),
    changeBusInfo: payload => dispatch(changeBusInfo(payload)),
    postSpecialBusInfo: payload => dispatch(postSpecialBusInfo(payload)),
    changeIsNewBus: payload => dispatch(changeIsNewBus(payload)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BusManage);
