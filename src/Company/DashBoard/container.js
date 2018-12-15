import DashBoard from './component';
import { connect } from 'react-redux';
import { async } from './actions';

const {
  fetchAmount,
  fetchQuantity,
  fetchAmountCategory,
  fetchAmountTrend,
  fetchDealerRank,
  fetchQuantityCategory,
} = async;

const mapStateToProps = state => state.DashBoard;

const mapDispatchToProps = dispatch => {
  return {
    fetchAmount: payload => {
      dispatch(fetchAmount(payload));
    },
    fetchQuantity: payload => {
      dispatch(fetchQuantity(payload));
    },
    fetchAmountCategory: payload => {
      dispatch(fetchAmountCategory(payload));
    },
    fetchAmountTrend: payload => {
      dispatch(fetchAmountTrend(payload));
    },
    fetchDealerRank: payload => {
      dispatch(fetchDealerRank(payload));
    },
    fetchQuantityCategory: payload => {
      dispatch(fetchQuantityCategory(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
