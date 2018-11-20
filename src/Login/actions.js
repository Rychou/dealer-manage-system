import { Async } from 'redux-action-boilerplate';

export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';

export const async = new Async({
  prefix: 'user',
  actions: ['fetchUser'],
});

export const logout = payload => ({
  type: LOGOUT,
  payload,
});
