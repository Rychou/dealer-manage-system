import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';
import { message } from 'antd';

const { fetchUser } = async;

export function* doFetchUser(action) {
  try {
    const { data } = yield call(request.get, `/user/${action.payload.type}`);
    yield put(fetchUser.success({ userMsg: data, type: action.payload.type }));
    localStorage.setItem('user', JSON.stringify({ userMsg: data, type: action.payload.type }));
    message.success('登录成功!');
  } catch (err) {
    yield put(fetchUser.failure(err));
    message.failure('登录失败！');
  }
}

export default function* () {
  yield takeEvery(fetchUser.TYPE, doFetchUser);
}
