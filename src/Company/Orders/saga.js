import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import async from './actions';
import { message } from 'antd';


const { fetchCompanyOrders, updateCompanyOrderStatus, linkExpress } = async;

function* doFetchOrders() {
  try {
    const { data } = yield call(request.get, '/orders/group');
    yield put(fetchCompanyOrders.success({ orders: data }));
  } catch (err) {
    yield put(fetchCompanyOrders.failure(err));
  }
}

function* doCompanyUpdateOrderStatus(action) {
  try {
    const { data } = yield call(request, {
      method: 'patch',
      url: `/orders/${action.payload.id}`,
      data: { orderStatus: action.payload.status },
    });
    yield put(updateCompanyOrderStatus.success({ isSuccess: data }));
    action.payload.fetchOrders();
    message.success('确认订单成功');
  } catch (err) {
    yield put(updateCompanyOrderStatus.failure(err));
  }
}

function* doLinkExpress(action) {
  try {
    const { data } = yield call(request, {
      method: 'patch',
      url: `/orders/${action.payload.id}`,
      data: { expressNumber: action.payload.expressNumber, orderStatus: action.payload.status },
    });
    // yield call(request, {
    //   method: 'patch',
    //   url: `/orders/${action.payload.id}`,
    //   data: { status: action.payload.status },
    // });
    action.payload.fetchOrders();
    message.success('关联物流成功');
    yield put(linkExpress.success({ isSuccess: data }));
  } catch (err) {
    yield put(linkExpress.failure(err));
  }
}


export default function* () {
  yield takeEvery(fetchCompanyOrders.TYPE, doFetchOrders);
  yield takeEvery(updateCompanyOrderStatus.TYPE, doCompanyUpdateOrderStatus);
  yield takeEvery(linkExpress.TYPE, doLinkExpress);
}
