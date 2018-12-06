import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchProductDetail } = async;

function* doFetchProductDetail(action) {
  try {
    const { data } = yield call(request.get, `/products/${action.payload.no}`);
    yield put(fetchProductDetail.success({ product: data }));
  } catch (err) {
    yield put(fetchProductDetail.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchProductDetail.TYPE, doFetchProductDetail);
}
