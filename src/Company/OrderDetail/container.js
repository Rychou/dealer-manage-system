import { async } from './actions';
import { connect } from 'react-redux';
import OrderDetail from './component';

const { fetchCompanyOrderDetail, updateCompanyOrderStatus, linkExpress } = async;

const mapStateToProps = state => state.OrderDetail;

const mapDispatchToProps = dispatch => ({
  fetchCompanyOrderDetail: payload => dispatch(fetchCompanyOrderDetail(payload)),
  updateCompanyOrderStatus: payload => dispatch(updateCompanyOrderStatus(payload)),
  linkExpress: payload => dispatch(linkExpress(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetail);
