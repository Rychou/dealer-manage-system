import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'orders',
  actions: ['fetchOrderDetail'],
});

// export const expressAsync = new Async({
//   prefix: 'express',
//   actions: ['fetchExpress'],
// });
