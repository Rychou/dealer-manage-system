import { async, UPDATE_PRODUCTS, UPDATE_ADDRESS, UPDATE_CURRENT_STEP } from './actions';
import { fetchState } from 'utils';

const { newOrder } = async;

const initState = {
  products: [],
  address: {},
  currentStep: 0,
  newOrder: fetchState,
};
const computePrice = products => {
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price * products[i].amount;
  }
  return totalPrice;
};

const NewOrder = (state = initState, action) => {
  switch (action.type) {
    case newOrder.TYPE:
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          isFetching: true,
        },
      };
    case newOrder.SUCCESS:
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          isResolved: true,
          isFetching: false,
          ...action.payload,
        },
      };
    case newOrder.FAILURE:
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          isRejected: true,
          isFetching: false,
        },
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        totalPrice: computePrice(action.payload),
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case UPDATE_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    default:
      return state;
  }
};

export default NewOrder;
