import { all } from 'redux-saga/effects';
import list from './pages/List/saga';
import index from './pages/Index/saga';

export default function* rootSaga() {
  yield all([list(), index()]);
}
