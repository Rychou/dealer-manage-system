import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { resolveIndex, reject, FETCH_INDEX } from './antions';

export function* fetchIndex() {
  try {
    const { data } = yield call(request.get, '/companys');
    yield put(resolveIndex(data.companys));
  } catch (err) {
    yield put(reject(err));
  }
}

export default function* () {
  yield takeEvery(FETCH_INDEX, fetchIndex);
}
