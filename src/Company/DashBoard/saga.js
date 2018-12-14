import { takeEvery, put, call } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const {
  fetchAmount,
  fetchQuantity,
  fetchAmountCategory,
  fetchAmountTrend,
  fetchDealerRank,
} = async;

function* doFetchAmount(action) {
  try {
    const { data } = yield call(request.get, '/productSale/amount');
    yield put(fetchAmount.success({ amount: data }));
  } catch (err) {
    yield put(fetchAmount.failure(err));
  }
}

function* doFetchQuantity(action) {
  try {
    const { data } = yield call(request.get, '/productSale/quantity');
    yield put(fetchQuantity.success({ quantity: data }));
  } catch (err) {
    yield put(fetchQuantity.failure(err));
  }
}

function* doFetchAmountCategory(action) {
  try {
    const { data } = yield call(request.get, '/productSale/amount/category');
    yield put(fetchAmountCategory.success({ amountCategory: data }));
  } catch (err) {
    yield put(fetchAmountCategory.failure(err));
  }
}

function* doFetchAmountTrend(action) {
  try {
    const { data } = yield call(request.get, '/productSale/amount/trend');
    yield put(fetchAmountTrend.success({ amountTrend: data }));
  } catch (err) {
    yield put(fetchAmountTrend.failure(err));
  }
}

function* doFetchDealerRank(action) {
  try {
    const { data } = yield call(request.get, '/productSale/rank/dealer');
    yield put(fetchDealerRank.success({ dealerRank: data }));
  } catch (err) {
    yield put(fetchDealerRank.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchAmount.TYPE, doFetchAmount);
  yield takeEvery(fetchQuantity.TYPE, doFetchQuantity);
  yield takeEvery(fetchAmountCategory.TYPE, doFetchAmountCategory);
  yield takeEvery(fetchAmountTrend.TYPE, doFetchAmountTrend);
  yield takeEvery(fetchDealerRank.TYPE, doFetchDealerRank);
}
