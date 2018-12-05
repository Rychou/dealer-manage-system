import { async } from './actions';
import { fetchState } from 'utils';

const { fetchOrders } = async;

const initState = {
  ...fetchState,
  orders: [],
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
