import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchOrderDetail } = async;

function* doFetchOrderDetail(action) {
  try {
    const { data } = yield call(request.get, `/orders/${action.payload.id}`);
    yield put(fetchOrderDetail.success({ order: data }));
  } catch (err) {
    yield put(fetchOrderDetail.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchOrderDetail.TYPE, doFetchOrderDetail);
}
