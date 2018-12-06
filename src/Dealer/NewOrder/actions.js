import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'newOrder',
  actions: ['newOrder'],
});

export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_CURRENT_STEP = 'UPDATE_CURRENT_STEP';

export const updateProducts = products => ({
  type: UPDATE_PRODUCTS,
  payload: products,
});

export const updateAddress = address => ({
  type: UPDATE_ADDRESS,
  payload: address,
});

export const updateCurrentStep = step => ({
  type: UPDATE_CURRENT_STEP,
  payload: step,
});
