import { takeEvery, put, call } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const {
  fetchAmount,
  fetchQuantity,
  fetchAmountCategory,
  fetchAmountTrend,
  fetchDealerRank,
  fetchQuantityCategory,
} = async;

function* doFetchAmount() {
  try {
    const { data } = yield call(
      request.get,
      'http://mock.eolinker.com/Ki7sKHi5e8bf534512472244102647e6e5dbd900d64b53b?uri=/productSale/amount',
    );
    yield put(fetchAmount.success({ amount: data }));
  } catch (err) {
    yield put(fetchAmount.failure(err));
  }
}

function* doFetchQuantity() {
  try {
    const { data } = yield call(
      request.get,
      'http://mock.eolinker.com/Ki7sKHi5e8bf534512472244102647e6e5dbd900d64b53b?uri=/productSale/quantity',
    );
    yield put(fetchQuantity.success({ quantity: data }));
  } catch (err) {
    yield put(fetchQuantity.failure(err));
  }
}

function* doFetchAmountCategory() {
  try {
    const { data } = yield call(
      request.get,
      'http://mock.eolinker.com/Ki7sKHi5e8bf534512472244102647e6e5dbd900d64b53b?uri=/productSale/amount/category',
    );
    yield put(fetchAmountCategory.success({ amountCategory: data }));
  } catch (err) {
    yield put(fetchAmountCategory.failure(err));
  }
}

function* doFetchAmountTrend() {
  try {
    const { data } = yield call(
      request.get,
      'http://mock.eolinker.com/Ki7sKHi5e8bf534512472244102647e6e5dbd900d64b53b?uri=/productSale/amount/trend',
    );
    yield put(fetchAmountTrend.success({ amountTrend: data }));
  } catch (err) {
    yield put(fetchAmountTrend.failure(err));
  }
}

function* doFetchDealerRank() {
  try {
    const { data } = yield call(
      request.get,
      'http://mock.eolinker.com/Ki7sKHi5e8bf534512472244102647e6e5dbd900d64b53b?uri=/productSale/rank/dealer',
    );
    yield put(fetchDealerRank.success({ dealerRank: data }));
  } catch (err) {
    yield put(fetchDealerRank.failure(err));
  }
}

function* doFetchQuantityCategory() {
  try {
    const { data } = yield call(
      request.get,
      'http://mock.eolinker.com/Ki7sKHi5e8bf534512472244102647e6e5dbd900d64b53b?uri=/productSales/quantity/category',
    );
    yield put(fetchQuantityCategory.success({ quantityCategory: data }));
  } catch (err) {
    yield put(fetchQuantityCategory.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchAmount.TYPE, doFetchAmount);
  yield takeEvery(fetchQuantity.TYPE, doFetchQuantity);
  yield takeEvery(fetchAmountCategory.TYPE, doFetchAmountCategory);
  yield takeEvery(fetchAmountTrend.TYPE, doFetchAmountTrend);
  yield takeEvery(fetchDealerRank.TYPE, doFetchDealerRank);
  yield takeEvery(fetchQuantityCategory.TYPE, doFetchQuantityCategory);
}
