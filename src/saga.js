import { all } from 'redux-saga/effects';
import Login from './Login/saga';
import Orders from './Dealer/Index/saga';
import OrderDetail from './Dealer/OrderDetail/saga';
import Products from './Dealer/Products/saga';
import ProductDetail from './Dealer/ProductDetail/saga';

export default function* rootSaga() {
  yield all([Login(), Orders(), OrderDetail(), Products(), ProductDetail()]);
}
