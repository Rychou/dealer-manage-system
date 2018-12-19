import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';
import { Modal } from 'antd';

const { info } = Modal;

const { fetchOrders, updateOrderStatus } = async;
function* doFetchOrders(action) {
  try {
    const { data } = yield call(request.get, '/orders');
    yield put(fetchOrders.success({ orders: data }));
  } catch (err) {
    yield put(fetchOrders.failure(err));
  }
}

function* doUpdateOrderStatus(action) {
  try {
    const { data } = yield call(request, {
      method: 'patch',
      url: `/orders/${action.payload.id}`,
      data: { status: action.payload.status },
    });
    yield put(updateOrderStatus.success({ isSuccess: data.msg }));
    info({
      title: data.msg,
    });
  } catch (err) {
    yield put(updateOrderStatus.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchOrders.TYPE, doFetchOrders);
  yield takeEvery(updateOrderStatus.TYPE, doUpdateOrderStatus);
}
