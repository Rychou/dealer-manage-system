import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import axios from 'axios';
import qs from 'qs';
import async from './actions';
import { message } from 'antd';


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const { fetchCompanyOrderDetail, updateCompanyDetailOrderStatus, linkDetailExpress } = async;

function* doCompanyFetchOrderDetail(action) {
  try {
    const { data } = yield call(request.get, `/orders/${action.payload.id}`);
    if (data.expressNumber) {
      const { data: expressData } = yield call(axios,
        {
          method: 'post',
          url: 'http://api.shujuzhihui.cn/api/sjzhApi/searchExpress',
          data: qs.stringify({
            appKey: '1b4e55f6371b4e92adbaaf154bf17f0c',
            expressNo: data.expressNumber,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      if (expressData.ERRORCODE !== '0') {
        message.error('物流单号错误');
      }
      yield put(fetchCompanyOrderDetail.success({ order: data, express: expressData }));
    } else yield put(fetchCompanyOrderDetail.success({ order: data }));
    // delete next line
    // yield put(fetchCompanyOrderDetail.success({ order: data }));
  } catch (err) {
    yield put(fetchCompanyOrderDetail.failure(err));
  }
}

function* doCompanyDetailUpdateOrderStatus(action) {
  try {
    const { data } = yield call(request, {
      method: 'patch',
      url: `/orders/${action.payload.id}`,
      data: { orderStatus: String(action.payload.status) },
    });
    yield put(updateCompanyDetailOrderStatus.success({ isSuccess: data }));
    action.payload.fetchCompanyOrderDetail({ id: action.payload.id });
    message.success('确认订单成功');
  } catch (err) {
    yield put(updateCompanyDetailOrderStatus.failure(err));
  }
}

function* doDetailLinkExpress(action) {
  try {
    const { data: linkExpress } = yield call(request, {
      method: 'patch',
      url: `/orders/${action.payload.id}`,
      data: { expressNumber: action.payload.expressNumber, orderStatus: String(action.payload.status) },
    });
    action.payload.fetchCompanyOrderDetail({ id: action.payload.id });
    message.success('关联物流成功');
    yield put(linkDetailExpress.success({ isSuccess: linkExpress }));
  } catch (err) {
    yield put(linkDetailExpress.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchCompanyOrderDetail.TYPE, doCompanyFetchOrderDetail);
  yield takeEvery(updateCompanyDetailOrderStatus.TYPE, doCompanyDetailUpdateOrderStatus);
  yield takeEvery(linkDetailExpress.TYPE, doDetailLinkExpress);
}
