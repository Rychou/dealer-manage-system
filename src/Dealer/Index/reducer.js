import async from './actions';
import { fetchState } from 'utils';
import { combineReducers } from 'redux';

const { fetchOrders, updateOrderStatus, payOrder } = async;

const initState = {
  Orders: {
    ...fetchState,
    orders: [],
  },
  orderStatus: {
    ...fetchState,
    isSuccess: {},
  },
  pay: {
    ...fetchState,
    isSuccess: {},
  },
};

const OrdersReducer = (state = initState, action) => {
  switch (action.type) {
    case fetchOrders.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchOrders.SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        isFetching: false,
        isResolved: true,
      };
    case fetchOrders.FAILURE:
      return {
        ...state,
        isRejected: true,
        isFetching: false,
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

const PayReducer = (state = initState.pay, action) => {
  switch (action.type) {
    case payOrder.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case payOrder.SUCCESS:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        isFetching: false,
        isResolved: true,
      };
    case payOrder.FAILURE:
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
  Orders: OrdersReducer,
  OrderStatus: OrderStatusReducer,
  Pay: PayReducer,
});
