import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchBusInfo, fetchChargeRecord } = async;

export function* doFetchBusInfo(action) {
  try {
    const busInfo = yield call(request, {
      url: `/buses/${action.payload.vin}`,
      method: 'get',
    });
    yield put(fetchBusInfo.success({ busInfo: busInfo.data }));
  } catch (err) {
    yield put(fetchBusInfo.failure(err));
  }
}

export function* doFetchChargeRecord(action) {
  try {
    const chargeRecord = yield call(request, {
      url: `/buses/${action.payload.vin}/chargeRecord`,
      method: 'get',
      params: {
        page: action.payload.page || 1,
        row: action.payload.row || 10,
        ...action.payload,
      },
    });
    yield put(fetchChargeRecord.success({ chargeRecord: chargeRecord.data }));
  } catch (err) {
    yield put(fetchChargeRecord.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchBusInfo.TYPE, doFetchBusInfo);
  yield takeEvery(fetchChargeRecord.TYPE, doFetchChargeRecord);
}
