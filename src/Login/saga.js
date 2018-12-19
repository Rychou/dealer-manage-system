import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { async, TOGGLE_SHOW_SIGNUP } from './actions';
import { message } from 'antd';
import request from 'request';

const { fetchUser, login, signUp } = async;

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
  } catch (err) {
    yield put(fetchUser.failure(err));
  }
}

function* doLogin(action) {
  try {
    const formData = new FormData();
    formData.set('username', action.payload.username);
    formData.set('password', action.payload.password);
    const { data } = yield call(request, {
      url: '/users/login',
      data: formData,
      method: 'post',
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    });
    yield put(login.success(data));
    if (action.payload.remember) {
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      localStorage.setItem('userMsg', JSON.stringify(data.userMsg));
    }
    message.success('登录成功!');
  } catch (err) {
    yield put(login.failure(err));
    message.error('登录失败！');
  }
}

function* doSignUp(action) {
  try {
    const { data } = yield call(request, {
      url: '/users/signup',
      method: 'post',
      data: action.payload,
    });
    if (data) {
      message.success('注册成功');
      yield put({ type: TOGGLE_SHOW_SIGNUP });
    }
  } catch (err) {
    message.error('注册失败！');
    yield put(signUp.failure(err));
  }
}

export default function* () {
  yield takeEvery(login.TYPE, doLogin);
  yield takeEvery(signUp.TYPE, doSignUp);
}
