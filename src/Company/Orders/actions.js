import { Async } from 'redux-action-boilerplate';

const async = new Async({
  prefix: 'orders',
  actions: ['fetchCompanyOrders', 'updateCompanyOrderStatus', 'linkExpress'],
});

export default async;
