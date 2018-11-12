import { all } from 'redux-saga/effects';
import Index from './Index/saga';

export default function* rootSaga() {
  yield all([Index()]);
}
