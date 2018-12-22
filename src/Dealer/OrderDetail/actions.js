import { Async } from 'redux-action-boilerplate';

const async = new Async({
  prefix: 'orders',
  actions: ['fetchOrderDetail', 'updateDetailOrderStatus'],
});

export default async;

// export const expressAsync = new Async({
//   prefix: 'express',
//   actions: ['fetchExpress'],
// });
