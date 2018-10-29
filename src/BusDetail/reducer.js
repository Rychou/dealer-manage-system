import { async } from './actions';

const { fetchBusDetail } = async;

const initState = {
  basic: {},
  chargeRecord: {},
  isFetching: false,
  isRejected: false,
  isResolve: false,
};

const BusDetail = (state = initState, action) => {
  switch (action.type) {
    case fetchBusDetail.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchBusDetail.SUCCESS:
      return {
        ...state,
        basic: action.payload.basic,
        chargeRecord: action.payload.chargeRecord,
        isResolve: true,
      };
    case fetchBusDetail.FAIL:
      return {
        ...state,
        isRejected: true,
      };
    default:
      return state;
  }
};

export default BusDetail;
