import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchBusDetail } = async;

export function* doFetchBusDetail(action) {
  try {
    const basic = yield call(request, {
      url: `/buses/${action.payload.vin}`,
      method: 'get',
    });
    const chargeRecord = yield call(request, {
      url: `/buses/${action.payload.vin}/chargeRecord`,
      method: 'get',
    });
    yield put(fetchBusDetail.success({ basic: basic.data, chargeRecord: chargeRecord.data }));
  } catch (err) {
    yield put(fetchBusDetail.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchBusDetail.TYPE, doFetchBusDetail);
}
