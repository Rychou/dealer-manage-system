import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async, UPDATE_INFOWINDOW } from './actions';
import { Card } from 'antd';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

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
    const infoWindowContent = (
      <Card bordered={false} title={data.plateNumber}>
        <p>车辆自编号:{data.selfNum}</p>
        <p>启用时间:{data.driveLicenceRegDate}</p>
        <p>
          归属线路:{data.line}
          <span>剩余电量:{data.soc}%</span>
        </p>
        <p>
          理论续航:{data.theoryMileage}公里<span>速度:{data.speed}km/h</span>
        </p>
      </Card>
    );
    yield put(fetchBusInfo.success({ busInfo: data }));
    yield put({
      type: UPDATE_INFOWINDOW,
      payload: {
        content: ReactDOMServer.renderToString(infoWindowContent),
        visible: true,
      },
    });
  } catch (err) {
    yield put(fetchBusInfo.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchMapData.TYPE, doFetchMapData);
  yield takeEvery(fetchBusInfo.TYPE, doFetchBusInfo);
}
