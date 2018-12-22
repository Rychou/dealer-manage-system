import { Async } from 'redux-action-boilerplate';

const async = new Async({
  prefix: 'orders',
  actions: ['fetchCompanyOrderDetail', 'updateCompanyDetailOrderStatus', 'linkDetailExpress'],
});

export default async;
