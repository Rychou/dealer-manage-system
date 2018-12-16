import { async } from './actions';
import { fetchState } from 'utils';
import { combineReducers } from 'redux';

const { fetchOrderDetail, updateOrderStatus } = async;

const initState = {
  orderDetail: {
    ...fetchState,
    order: {},
    express: {},
  },
  orderStatus: {
    ...fetchState,
    isSuccess: {},
  },
};


const OrderDetailReducer = (state = initState.orderDetail, action) => {
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
    case fetchOrderDetail.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

const OrderStatusReducer = (state = initState.orderStatus, action) => {
  switch (action.type) {
    case updateOrderStatus.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case updateOrderStatus.SUCCESS:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        isFetching: false,
        isResolved: true,
      };
    case updateOrderStatus.FAILURE:
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
  OrderDetail: OrderDetailReducer,
  OrderStatus: OrderStatusReducer,
});
