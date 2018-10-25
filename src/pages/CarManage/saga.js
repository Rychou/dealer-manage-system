import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'network';
import { async, updatePagination } from './actions';

const { fetchCarsInfo } = async;

export function* fetchCarList(action) {
    try {
        const { data } = yield call(fetch, { url: '/carManageList', method: 'get', params: action.payload });
        yield put(updatePagination({ total: data.totalCount }));
        yield put(fetchCarsInfo.success(data));
    } catch (e) {
        yield put(fetchCarsInfo.failure(e));
    }
}

export default function* () {
    yield takeEvery(fetchCarsInfo.TYPE, fetchCarList);
}
