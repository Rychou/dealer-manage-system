import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { async } from './actions';
import { message } from 'antd';

const { fetchUser } = async;

export function* doFetchUser(action) {
  try {
    const { data } = yield call(
      axios.get,
      `http://mock.eolinker.com/Ki7sKHi5e8bf534512472244102647e6e5dbd900d64b53b?uri=/user/${
        action.payload.type
      }`,
    );
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
