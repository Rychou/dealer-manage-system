import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'request';
import async from './actions';

const { fetchReport, updatePagination } = async;

export function* fetchReportList(action) {
  try {
    const { data } = yield call(fetch, {
      url: 'buses/report',
      method: 'get',
      params: action.payload,
    });

    console.log(data.data);

    yield put(updatePagination({ total: data.row }));
    yield put(fetchReport.success(data.data));
  } catch (e) {
    yield put(fetchReport.failure(e));
  }
}

export default function* () {
  yield takeEvery(fetchReport.TYPE, fetchReportList);
}
