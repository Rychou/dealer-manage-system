import { async } from './actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import request from 'request';

const { newOrder } = async;

function* doNewOrder(action) {
  try {
    const { data } = yield call(request, {
      method: 'post',
      url: '/orders',
      data: action.payload,
    });
    yield put(newOrder.success(data));
  } catch (err) {
    yield put(newOrder.failure(err));
  }
}

export default function* () {
  yield takeEvery(newOrder.TYPE, doNewOrder);
}
