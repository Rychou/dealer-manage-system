import { all } from 'redux-saga/effects';
import Login from './Login/saga';
import Products from './Dealer/Products/saga';

export default function* rootSaga() {
  yield all([Login(), Products()]);
}
