import { UPDATE_PRODUCTS, UPDATE_ADDRESS } from './actions';

const initState = {
  products: [],
  address: {},
};

const NewOrder = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default NewOrder;
