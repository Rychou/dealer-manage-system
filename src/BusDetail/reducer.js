import { async } from './actions';
import { combineReducers } from 'redux';

const { fetchBusInfo, fetchChargeRecord } = async;

const busInofInitState = {
  staticInfo: {},
  isFetching: false,
  isRejected: false,
  isResolved: false,
};

const chargeRecordInitState = {
  isFetching: false,
  isRejected: false,
  isResolved: false,
};

const busInfo = (state = busInofInitState, action) => {
  switch (action.type) {
    case fetchBusInfo.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchBusInfo.SUCCESS:
      return {
        ...state,
        ...action.payload.busInfo,
        isResolved: true,
        isFetching: false,
      };
    case fetchBusInfo.FAIL:
      return {
        ...state,
        isRejected: true,
      };
    default:
      return state;
  }
};

const chargeRecord = (state = chargeRecordInitState, action) => {
  switch (action.type) {
    case fetchChargeRecord.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchChargeRecord.SUCCESS:
      return {
        ...state,
        ...action.payload.chargeRecord,
        isResolved: true,
        isFetching: false,
      };
    case fetchChargeRecord.FAIL:
      return {
        ...state,
        isRejected: true,
      };
    default:
      return state;
  }
};


export default combineReducers({
  busInfo,
  chargeRecord,
});
