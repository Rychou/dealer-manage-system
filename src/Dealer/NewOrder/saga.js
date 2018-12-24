import { async } from './actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import request from 'request';
import { message } from 'antd';

const { newOrder, pay } = async;

function* doNewOrder(action) {
  try {
    const { data } = yield call(request, {
      method: 'post',
      url: '/orders',
      data: action.payload.orderMsg,
    });
    yield put(newOrder.success(data));
    action.payload.history.push('/newOrder/pay');
  } catch (err) {
    yield put(newOrder.failure(err));
  }
}

function* doPay(action) {
  try {
    const { orderId, history, updateCurrentStep } = action.payload;
    const { data } = yield call(request, {
      method: 'PATCH',
      url: `/orders/${orderId}`,
      data: { orderStatus: '1' },
    });
    yield put(pay.success(data));
    message.success('支付成功');
    history.push('/newOrder/result', {
      payDate: new Date(),
    });
    updateCurrentStep(2); // 更新当前前段进读条新建订单进行的进度。
  } catch (err) {
    message.error('支付失败');
    yield put(pay.failure(err));
  }
}

export default function* () {
  yield takeEvery(newOrder.TYPE, doNewOrder);
  yield takeEvery(pay.TYPE, doPay);
}
