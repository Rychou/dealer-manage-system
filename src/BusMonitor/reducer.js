import { async, UPDATE_PAGINATION } from './actions';

const { fetchMonitors } = async;

const initState = {
  monitors: [],
  lowBatteryLimit: 0,
  pagination: {
    row: 10,
    page: 1,
  },
  isFetching: false,
  isRejected: false,
  isResolve: false,
};

const monitors = (state = initState, action) => {
  switch (action.type) {
    case fetchMonitors.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchMonitors.SUCCESS:
      return {
        ...state,
        monitors: action.payload.monitors,
        lowBatteryLimit: action.payload.lowBatteryLimit,
        isFetching: false,
        isResolve: true,
      };
    case fetchMonitors.FAILURE:
      return {
        ...state,
        isRejected: true,
      };
    case UPDATE_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.pagination },
      };
    default:
      return state;
  }
};

export default monitors;
