import { async } from './actions';
import { fetchState } from 'utils';
import { combineReducers } from 'redux';
import moment from 'moment';

const {
  fetchAmount,
  fetchQuantity,
  fetchAmountCategory,
  fetchAmountTrend,
  fetchDealerRank,
  fetchQuantityCategory,
} = async;

const initState = {
  amountWrapper: {
    amount: {},
    ...fetchState,
  },
  quantityWrapper: {
    quantity: {},
    ...fetchState,
  },
  amountCategoryWrapper: {
    amountCategory: [],
    ...fetchState,
  },
  quantityCategoryWrapper: {
    quantityCategory: [],
    ...fetchState,
  },
  amountTrendWrapper: {
    ...fetchState,
    amountTrend: {},
  },
  dealerRankWrapper: {
    ...fetchState,
    dealerRank: {},
  },
};

const computeRecent = recent => {
  const arr = [];
  const reverseRecent = recent.reverse();
  const beginDay = new Date().getTime();

  for (let i = reverseRecent.length - 1; i >= 0; i -= 1) {
    arr.push({
      x: moment(new Date(beginDay - 1000 * 60 * 60 * 24 * (i + 1))).format('YYYY-MM-DD'),
      y: reverseRecent[i],
    });
  }
  return arr;
};

const quantityReducer = (state = initState.quantityWrapper, action) => {
  switch (action.type) {
    case fetchQuantity.TYPE:
      return {
        ...state,
        isFetching: true,
        isResolved: false,
        isRejected: false,
      };
    case fetchQuantity.SUCCESS:
      return {
        ...state,
        quantity: {
          ...action.payload.quantity,
          recent: computeRecent(action.payload.quantity.recent),
        },
        isFetching: false,
        isResolved: true,
      };
    case fetchQuantity.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

const amountReducer = (state = initState.amountWrapper, action) => {
  switch (action.type) {
    case fetchAmount.TYPE:
      return {
        ...state,
        isFetching: true,
        isResolved: false,
        isRejected: false,
      };
    case fetchAmount.SUCCESS:
      return {
        ...state,
        amount: action.payload.amount,
        isFetching: false,
        isResolved: true,
      };
    case fetchAmount.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

const amountCategoryReducer = (state = initState.amountCategoryWrapper, action) => {
  switch (action.type) {
    case fetchAmountCategory.TYPE:
      return {
        ...state,
        isFetching: true,
        isResolved: false,
        isRejected: false,
      };
    case fetchAmountCategory.SUCCESS:
      return {
        ...state,
        amountCategory: action.payload.amountCategory.map(item => ({
          x: item.category,
          y: item.amount,
        })),
        isFetching: false,
        isResolved: true,
      };
    case fetchAmountCategory.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

const amountTrendReducer = (state = initState.amountTrendWrapper, action) => {
  switch (action.type) {
    case fetchAmountTrend.TYPE:
      return {
        ...state,
        isFetching: true,
        isResolved: false,
        isRejected: false,
      };
    case fetchAmountTrend.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isResolved: true,
        amountTrend: {
          ...state.amountTrend,
          year: action.payload.amountTrend.year.map((amount, index) => ({
            x: `${index + 1}月`,
            y: amount,
          })),
          month: action.payload.amountTrend.month.map((amount, index) => ({
            x: `${index + 1}日`,
            y: amount,
          })),
        },
      };
    case fetchAmountTrend.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

const dealerRankReducer = (state = initState.dealerRankWrapper, action) => {
  switch (action.type) {
    case fetchDealerRank.TYPE:
      return {
        ...state,
        isFetching: true,
        isResolved: false,
        isRejected: false,
      };
    case fetchDealerRank.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isResolved: true,
        dealerRank: {
          ...state.dealerRank,
          year: action.payload.dealerRank.year.sort((a, b) => a.amount - b.amount),
          month: action.payload.dealerRank.month.sort((a, b) => a.amount - b.amount),
        },
      };
    case fetchDealerRank.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

const quantityCategoryReducer = (state = initState.quantityCategoryWrapper, action) => {
  switch (action.type) {
    case fetchQuantityCategory.TYPE:
      return {
        ...state,
        isFetching: true,
        isResolved: false,
        isRejected: false,
      };
    case fetchQuantityCategory.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isResolved: true,
        quantityCategory: action.payload.quantityCategory.map(item => ({
          x: item.category,
          y: item.quantity,
        })),
      };
    case fetchQuantityCategory.FAILURE:
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
  amountWrapper: amountReducer,
  quantityWrapper: quantityReducer,
  amountCategoryWrapper: amountCategoryReducer,
  amountTrendWrapper: amountTrendReducer,
  dealerRankWrapper: dealerRankReducer,
  quantityCategoryWrapper: quantityCategoryReducer,
});
