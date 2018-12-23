import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import async from './actions';
import { message } from 'antd';


const { fetchOrders, updateOrderStatus } = async;
function* doFetchOrders() {
  try {
    const { data } = yield call(request, {
      method: 'get',
      url: '/orders',
    });
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
      data: { orderStatus: action.payload.status },
    });
    yield put(updateOrderStatus.success({ isSuccess: data }));
    message.success('已成功收货');
    action.payload.fetchOrders();
  } catch (err) {
    yield put(updateOrderStatus.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchOrders.TYPE, doFetchOrders);
  yield takeEvery(updateOrderStatus.TYPE, doUpdateOrderStatus);
}
