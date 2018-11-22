import { async } from './actions';

const { fetchOrders } = async;

const initState = {
  orders: [],
  isFetching: false,
  isResolved: false,
  isRejected: false,
};

const Orders = (state = initState, action) => {
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

export default Orders;
