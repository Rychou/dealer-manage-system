import { UPDATE_PRODUCTS, UPDATE_ADDRESS, UPDATE_CURRENT_STEP } from './actions';

const initState = {
  products: [],
  address: {},
  currentStep: 0,
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
