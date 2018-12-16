import { async } from './actions';
import { fetchState } from 'utils';

const { fetchOrderDetail } = async;

const initState = {
  ...fetchState,
  order: {},
  express: {},
};

const CompanyOrderDetail = (state = initState, action) => {
  switch (action.type) {
    case fetchOrderDetail.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchOrderDetail.SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        express: action.payload.express,
        isFetching: false,
        isResolved: true,
      };
    case fetchOrderDetail.FAIL:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

export default CompanyOrderDetail;
