import { async } from './actions';
import { connect } from 'react-redux';
import OrderDetail from './component';

const { fetchCompanyOrderDetail, updateCompanyDetailOrderStatus, linkDetailExpress } = async;

const mapStateToProps = state => state.OrderDetail;

const mapDispatchToProps = dispatch => ({
  fetchCompanyOrderDetail: payload => dispatch(fetchCompanyOrderDetail(payload)),
  updateCompanyOrderStatus: payload => dispatch(updateCompanyDetailOrderStatus(payload)),
  linkExpress: payload => dispatch(linkDetailExpress(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetail);
