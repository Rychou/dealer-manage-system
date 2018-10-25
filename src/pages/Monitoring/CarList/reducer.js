import { async, UPDATE_PAGINATION } from './actions';

const { fetchCars } = async;

const initState = {
  cars: [],
  lowBatteryLimit: 0,
  pagination: {},
  isFetching: false,
  isRejected: false,
  isResolve: false,
};

const cars = (state = initState, action) => {
  switch (action.type) {
    case fetchCars.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchCars.SUCCESS:
      return {
        ...state,
        cars: action.payload.cars,
        lowBatteryLimit: action.payload.lowBatteryLimit,
        isFetching: false,
        isResolve: true,
      };
    case fetchCars.FAILURE:
      return {
        ...state,
        isRejected: true,
      };
    case UPDATE_PAGINATION:
      return {
        ...state,
        pagination: action.pagination,
      };
    default:
      return state;
  }
};

export default cars;
