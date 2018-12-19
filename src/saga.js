import { all } from 'redux-saga/effects';
import Login from './Login/saga';
import Orders from './Dealer/Index/saga';
import OrderDetail from './Dealer/OrderDetail/saga';
import Products from './Dealer/Products/saga';
import ProductDetail from './Dealer/ProductDetail/saga';
import NewOrder from './Dealer/NewOrder/saga';
import Stock from './Company/Stock/saga';
import DashBoard from './Company/DashBoard/saga';
import CompanyOrders from './Company/Orders/saga';
import CompanyOrderDetail from './Company/OrderDetail/saga';

export default function* rootSaga() {
  yield all([
    Login(),
    Orders(),
    Products(),
    ProductDetail(),
    OrderDetail(),
    NewOrder(),
    Stock(),
    DashBoard(),
    CompanyOrders(),
    CompanyOrderDetail(),
  ]);
}
