import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchProducts } = async;

function* doFetchProducts(action) {
  try {
    const { data } = yield call(request.get, '/products');
    yield put(fetchProducts.success({ products: data }));
  } catch (err) {
    yield put(fetchProducts.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchProducts.TYPE, doFetchProducts);
}
