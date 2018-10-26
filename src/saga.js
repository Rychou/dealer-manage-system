import { all } from 'redux-saga/effects';
import Index from './Index/saga';
import BusMonitor from './BusMonitor/saga';

export default function* rootSaga() {
  yield all([Index(), BusMonitor()]);
}
