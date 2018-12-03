export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export const updateProducts = products => ({
  type: UPDATE_PRODUCTS,
  payload: products,
});

export const updateAddress = address => ({
  type: UPDATE_ADDRESS,
  payload: address,
});
