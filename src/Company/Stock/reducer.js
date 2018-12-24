import { async } from './actions';
import { fetchState } from 'utils';

const { fetchStocks, setStock } = async;

const initState = {
  ...fetchState,
  stocks: [],
  setStockState: fetchState,
};
const Stock = (state = initState, action) => {
  switch (action.type) {
    case fetchStocks.TYPE:
      return {
        ...state,
        isFetching: true,
        isResolved: false,
        isRejected: false,
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
    case setStock.TYPE:
      return {
        ...state,
        setStockState: {
          isFetching: true,
          isResolved: false,
          isRejected: false,
        },
      };
    case setStock.SUCCESS:
      return {
        ...state,
        setStockState: {
          isResolved: true,
          isFetching: false,
        },
      };
    case setStock.FAILURE:
      return {
        ...state,
        setStockState: {
          isFetching: false,
          isRejected: true,
        },
      };
    default:
      return state;
  }
};

export default Stock;
