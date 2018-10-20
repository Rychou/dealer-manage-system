import { all } from 'redux-saga/effects';
import list from './pages/List/saga';

export default function* rootSaga() {
  yield all([
    list(),
  ]);
}
