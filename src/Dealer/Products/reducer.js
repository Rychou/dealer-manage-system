import { async } from './actions';
import { fetchState } from 'utils';

const { fetchProducts } = async;

const initState = {
  ...fetchState,
  products: [],
};

const Products = (state = initState, action) => {
  switch (action.type) {
    case fetchProducts.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchProducts.SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        isFetching: false,
        isResolved: true,
      };
    case fetchProducts.FAILURE:
      return {
        ...state,
        isRejected: true,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default Products;
