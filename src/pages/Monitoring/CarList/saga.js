import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async, updatePagination } from './actions';

const { fetchCars } = async;

export function* fetchCarList(action) {
  try {
    const { data } = yield call(request, {
      url: '/monitors',
      method: 'get',
      params: action.payload,
    });
    yield put(updatePagination({ total: data.totalCount }));
    yield put(fetchCars.success(data));
  } catch (err) {
    yield put(fetchCars.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchCars.TYPE, fetchCarList);
}
