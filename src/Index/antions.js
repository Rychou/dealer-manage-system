import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'companies',
  actions: ['fetchCompanies'],
});