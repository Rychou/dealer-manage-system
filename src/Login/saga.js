import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async, LOGIN } from './actions';

const { fetchUser } = async;

export function* doFetchUser(action) {
  try {
    const { data } = yield call(request.get, `/user/${action.payload.type}`);
    yield put(fetchUser.success({ userMsg: data }));
  } catch (err) {
    yield put(fetchUser.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchUser.TYPE, doFetchUser);
}
