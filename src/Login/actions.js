import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'user',
  actions: ['fetchUser'],
});

export const LOGIN = 'LOGIN';
