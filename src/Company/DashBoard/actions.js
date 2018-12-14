import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'dashboard',
  actions: [
    'fetchAmount',
    'fetchQuantity',
    'fetchAmountCategory',
    'fetchAmountTrend',
    'fetchDealerRank',
  ],
});
