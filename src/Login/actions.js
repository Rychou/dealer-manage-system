import { Async } from 'redux-action-boilerplate';

export const LOGOUT = 'LOGOUT';
export const TOGGLE_SHOW_SIGNUP = 'TOGGLE_SHOW_SIGNUP';

export const async = new Async({
  prefix: 'user',
  actions: ['fetchUser', 'login', 'signUp'],
});

export const logout = payload => ({
  type: LOGOUT,
  payload,
});
