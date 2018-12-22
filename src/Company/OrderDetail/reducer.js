import async from './actions';
import { fetchState } from 'utils';
import { combineReducers } from 'redux';

const { fetchCompanyOrderDetail, updateCompanyDetailOrderStatus, linkDetailExpress } = async;

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
    case updateCompanyDetailOrderStatus.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case updateCompanyDetailOrderStatus.SUCCESS:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        isFetching: false,
        isResolved: true,
      };
    case updateCompanyDetailOrderStatus.FAILURE:
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
    case linkDetailExpress.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case linkDetailExpress.SUCCESS:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        isFetching: false,
        isResolved: true,
      };
    case linkDetailExpress.FAILURE:
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
