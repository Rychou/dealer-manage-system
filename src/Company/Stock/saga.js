import { takeEvery, put, call } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchStocks } = async;

function* doFetchStocks(action) {
  try {
    const { data } = yield call(request.get, '/groupInventory');
    yield put(fetchStocks.success(data));
  } catch (err) {
    yield put(fetchStocks.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchStocks.TYPE, doFetchStocks);
}
