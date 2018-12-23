import async from './actions';
import { fetchState } from 'utils';
import { combineReducers } from 'redux';

const { fetchCompanyOrders, updateCompanyOrderStatus, linkExpress } = async;

const initState = {
  Orders: {
    ...fetchState,
    orders: [],
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

const CompanyOrdersReducer = (state = initState.Orders, action) => {
  switch (action.type) {
    case fetchCompanyOrders.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchCompanyOrders.SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        isFetching: false,
        isResolved: true,
      };
    case fetchCompanyOrders.FAILURE:
      return {
        ...state,
        isRejected: true,
        isFetching: false,
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
  CompanyOrders: CompanyOrdersReducer,
  OrderStatus: CompanyOrderStatusReducer,
  Express: CompanyExpressReducer,
});
