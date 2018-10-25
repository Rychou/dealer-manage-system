import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'network';
import { async } from './actions';

const { fetchCars } = async;

export function* fetchCarList() {
  try {
    const { data } = yield call(fetch.get, '/cars');
    yield put(fetchCars.success(data));
  } catch (err) {
    yield put(fetchCars.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchCars.TYPE, fetchCarList);
}
