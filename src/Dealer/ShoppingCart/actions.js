export const TOGGLE_VISIBLE = 'TOGGLE_VISIBLE';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT_AMOUNT = 'UPDATE_PRODUCT_AMOUNT';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';

export const toggleVisible = payload => ({
  type: TOGGLE_VISIBLE,
  payload,
});

export const addProduct = payload => ({
  type: ADD_PRODUCT,
  payload,
});

export const updateProductAmount = payload => ({
  type: UPDATE_PRODUCT_AMOUNT,
  payload,
});

export const selectProduct = payload => ({
  type: SELECT_PRODUCT,
  payload,
});
