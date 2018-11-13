import { all } from 'redux-saga/effects';
import Index from './Index/saga';
import Login from './Login/saga';

export default function* rootSaga() {
  yield all([Index(), Login()]);
}
