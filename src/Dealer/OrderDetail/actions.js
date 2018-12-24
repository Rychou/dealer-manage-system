import { Async } from 'redux-action-boilerplate';

const async = new Async({
  prefix: 'orders',
  actions: ['fetchOrderDetail', 'updateDetailOrderStatus', 'payDetailOrder'],
});

export default async;
