import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'request';
import { async, updatePagination } from './actions';

const { fetchBusInfo } = async;

export function* fetchBusList(action) {
  try {
    const { data } = yield call(fetch, {
      url: '/buses',
      method: 'get',
      params: action.payload,
    });
    yield put(updatePagination({ total: data.totalCount, ...action.payload }));
    yield put(fetchBusInfo.success(data));
  } catch (e) {
    yield put(fetchBusInfo.failure(e));
  }
}

export default function* () {
  yield takeEvery(fetchBusInfo.TYPE, fetchBusList);
}
