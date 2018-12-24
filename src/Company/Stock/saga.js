import { takeEvery, put, call } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchStocks, setStock } = async;

function* doFetchStocks(action) {
  try {
    const { data } = yield call(request.get, '/groupInventory');
    yield put(fetchStocks.success(data));
  } catch (err) {
    yield put(fetchStocks.failure(err));
  }
}

function* doSetStock(action) {
  const { postData, method } = action.payload;
  try {
    yield call(request, {
      url: '/groupInventory',
      method: 'post',
      data: postData,
    });
    yield put(setStock.success());
    method.hideModal();
    method.fetchStocks();
    method.resetFields();
  } catch (err) {
    yield put(setStock.failure(err));
    method.hideModal();
  }
}

export default function* () {
  yield takeEvery(fetchStocks.TYPE, doFetchStocks);
  yield takeEvery(setStock.TYPE, doSetStock);
}
