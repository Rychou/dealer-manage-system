import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'stock',
  actions: ['fetchStocks', 'setStock'],
});
