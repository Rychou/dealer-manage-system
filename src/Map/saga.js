import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchMapData, fetchBusInfo } = async;

export function* doFetchMapData(action) {
  try {
    const { data } = yield call(request, {
      url: '/map',
      method: 'get',
      params: action.payload,
    });
    yield put(fetchMapData.success({ points: data }));
  } catch (err) {
    yield put(fetchMapData.failure(err));
  }
}

export function* doFetchBusInfo(action) {
  try {
    const { data } = yield call(request, {
      url: `/map/buses/${action.payload.vin}`,
      method: 'get',
    });
    yield put(fetchBusInfo.success({ busInfo: data }));
  } catch (err) {
    yield put(fetchBusInfo.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchMapData.TYPE, doFetchMapData);
  yield takeEvery(fetchBusInfo.TYPE, doFetchBusInfo);
}
