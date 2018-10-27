import { all } from 'redux-saga/effects';
import Index from './Index/saga';
import BusMonitor from './BusMonitor/saga';
import BusManagement from './BusManagement/saga';

export default function* rootSaga() {
  yield all([
      Index(),
      BusMonitor(),
      BusManagement(),
  ]);
}
