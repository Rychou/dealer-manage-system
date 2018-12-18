import { async } from './actions';
import { fetchState } from 'utils';
import { combineReducers } from 'redux';

const { fetchCompanyOrderDetail, updateCompanyOrderStatus, linkExpress } = async;

const initState = {
  OrderDetail: {
    ...fetchState,
    order: {},
    express: {},
  },
  OrderStatus: {
    ...fetchState,
    isSuccess: {},
  },
  Express: {
    ...fetchState,
    isSuccess: {},
  },
};

const CompanyOrderDetailReducer = (state = initState.OrderDetail, action) => {
  switch (action.type) {
    case fetchCompanyOrderDetail.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchCompanyOrderDetail.SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        express: action.payload.express,
        isFetching: false,
        isResolved: true,
      };
    case fetchCompanyOrderDetail.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

const CompanyOrderStatusReducer = (state = initState.OrderStatus, action) => {
  switch (action.type) {
    case updateCompanyOrderStatus.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case updateCompanyOrderStatus.SUCCESS:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        isFetching: false,
        isResolved: true,
      };
    case updateCompanyOrderStatus.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

const CompanyExpressReducer = (state = initState.Express, action) => {
  switch (action.type) {
    case linkExpress.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case linkExpress.SUCCESS:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        isFetching: false,
        isResolved: true,
      };
    case linkExpress.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

export default combineReducers({
  OrderDetail: CompanyOrderDetailReducer,
  OrderStatus: CompanyOrderStatusReducer,
  Express: CompanyExpressReducer,
});
