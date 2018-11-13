import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchCompanies } = async;

export function* doFetchCompanies() {
  try {
    const { data } = yield call(request.get, '/companies');
    yield put(fetchCompanies.success(data));
  } catch (err) {
    yield put(fetchCompanies.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchCompanies.TYPE, doFetchCompanies);
}
