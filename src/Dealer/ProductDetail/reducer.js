import { async } from './actions';
import { fetchState } from 'utils';

const { fetchProductDetail } = async;

const initState = {
  ...fetchState,
  product: {},
};

const ProductDetail = (state = initState, action) => {
  switch (action.type) {
    case fetchProductDetail.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchProductDetail.SUCCESS:
      return {
        ...state,
        product: {
          ...action.payload.product,
          categories: [action.payload.product.categories],
        },
        isFetching: false,
        isResolved: true,
      };
    case fetchProductDetail.FAIL:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

export default ProductDetail;
