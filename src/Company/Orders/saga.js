import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';
import { Modal } from 'antd';

const { info } = Modal;

const { fetchOrders, updateCompanyOrderStatus, linkExpress } = async;

function* doFetchOrders(action) {
  try {
    const { data } = yield call(request.get, '/company/orders');
    yield put(fetchOrders.success({ orders: data }));
  } catch (err) {
    yield put(fetchOrders.failure(err));
  }
}

function* doCompanyUpdateOrderStatus(action) {
  try {
    const { data } = yield call(request, {
      method: 'patch',
      url: `/orders/${action.payload.id}`,
      data: { status: action.payload.status },
    });
    yield put(updateCompanyOrderStatus.success({ isSuccess: data.msg }));
    info({
      title: data.msg,
    });
  } catch (err) {
    yield put(updateCompanyOrderStatus.failure(err));
  }
}

function* doLinkExpress(action) {
  try {
    const { data } = yield call(request, {
      method: 'post',
      url: `/orders/${action.payload.id}`,
      data: { expressNumber: action.payload.expressNumber },
    });
    yield call(request, {
      method: 'patch',
      url: `/orders/${action.payload.id}`,
      data: { status: action.payload.status },
    });
    info({
      title: data.msg,
    });
    yield put(linkExpress.success({ isSuccess: data.msg }));
  } catch (err) {
    yield put(linkExpress.failure(err));
  }
}


export default function* () {
  yield takeEvery(fetchOrders.TYPE, doFetchOrders);
  yield takeEvery(updateCompanyOrderStatus.TYPE, doCompanyUpdateOrderStatus);
  yield takeEvery(linkExpress.TYPE, doLinkExpress);
}
