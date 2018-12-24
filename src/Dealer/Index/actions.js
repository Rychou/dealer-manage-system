import { Async } from 'redux-action-boilerplate';

const async = new Async({
  prefix: 'orders',
  actions: ['fetchOrders', 'updateOrderStatus', 'payOrder'],
});

export default async;
