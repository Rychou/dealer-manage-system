import { all } from 'redux-saga/effects';
import Index from './pages/Index/saga';
import CarList from './pages/Monitoring/CarList/saga';

export default function* rootSaga() {
  yield all([Index(), CarList()]);
}
