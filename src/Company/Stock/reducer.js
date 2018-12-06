import { async } from './actions';
import { fetchState } from 'utils';

const { fetchStocks } = async;

const initState = {
  ...fetchState,
  stocks: [],
};
const Stock = (state = initState, action) => {
  switch (action.type) {
    case fetchStocks.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchStocks.SUCCESS:
      return {
        ...state,
        stocks: action.payload,
        isResolved: true,
        isFetching: false,
      };
    case fetchStocks.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

export default Stock;
