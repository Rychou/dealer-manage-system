import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async, updatePagination } from './actions';

const { fetchMonitors } = async;

export function* doFetchMonitors(action) {
  try {
    const { data } = yield call(request, {
      url: '/monitors',
      method: 'get',
      params: action.payload,
    });
    yield put(updatePagination({ total: data.totalCount }));
    yield put(fetchMonitors.success(data));
  } catch (err) {
    yield put(fetchMonitors.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchMonitors.TYPE, doFetchMonitors);
}
