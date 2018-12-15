import { TOGGLE_VISIBLE, SELECT_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT_AMOUNT } from './actions';
import { message } from 'antd';

const initState = {
  visible: false,
  products: [],
  selectedAmount: 0,
  selectedRowKeys: [],
  selectedProducts: [],
  totalPrice: 0,
};

const updateProductAmount = (amount, index, products) => {
  return products.length
    ? products.map((product, idx) => {
        if (index === idx) {
          return {
            ...product,
            amount,
          };
        }
        return product;
      })
    : [];
};

const computeTotalPrice = (selectedRowKeys, products) => {
  let totalPrice = 0;
  for (const key of selectedRowKeys) {
    for (const product of products) {
      if (product.no === key) {
        totalPrice += product.price * product.amount;
      }
    }
  }
  return Number(totalPrice.toFixed(2));
};

const addProduct = (products, nextProduct) => {
  for (const product of products) {
    if (product.no === nextProduct.no) {
      message.error('购物车已经有这个商品了噢！请不要重复添加');
      return products;
    }
  }
  message.success('加入成功！');
  return [...products, nextProduct];
};

// 根据选择的keys 来获得选择的Products数组
const computeSelectedProducts = (selectedRowKeys, products) => {
  let selectedProducts = [];
  for (const key of selectedRowKeys) {
    for (const product of products) {
      if (product.no === key) {
        selectedProducts = [...selectedProducts, product];
      }
    }
  }
  return selectedProducts;
};

const ShoppingCart = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBLE:
      return {
        ...state,
        visible: !state.visible,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: addProduct(state.products, action.payload),
        totalPrice: computeTotalPrice(state.selectedRowKeys, [...state.products, action.payload]),
      };
    case UPDATE_PRODUCT_AMOUNT:
      return {
        ...state,
        products: updateProductAmount(action.payload.amount, action.payload.index, state.products),
        totalPrice: computeTotalPrice(
          state.selectedRowKeys,
          updateProductAmount(action.payload.amount, action.payload.index, state.products),
        ),
        selectedProducts: computeSelectedProducts(
          state.selectedRowKeys,
          updateProductAmount(action.payload.amount, action.payload.index, state.products),
        ), // 此处用computeSelectedProducts函数而不用action传过来的selectedProducts是因为在这个action中，传过来的selectedProducts不会更新。
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedRowKeys: action.payload.selectedRowKeys,
        selectedAmount: action.payload.selectedRowKeys.length,
        selectedProducts: action.payload.selectedProducts, // 此处不用computeSelectedProducts函数是因为
        totalPrice: computeTotalPrice(action.payload.selectedRowKeys, state.products),
      };
    default:
      return state;
  }
};

export default ShoppingCart;
