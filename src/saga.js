import { all } from 'redux-saga/effects';
import Index from './Index/saga';
import BusMonitor from './BusMonitor/saga';
import BusManagement from './BusManagement/saga';
import BusDetail from './BusDetail/saga';
import Map from './Map/saga';

export default function* rootSaga() {
  yield all([Index(), BusMonitor(), BusManagement(), BusDetail(), Map()]);
}
