import { Async } from 'redux-action-boilerplate';

const async = new Async({
  prefix: 'report',
  actions: [
    'fetchReport',
    'updatePagination',
  ],
});

export default async;
