import { async, UPDATE_PAGINATION } from './actions';

const {
  fetchBusInfo,
  changeDrawerVisible,
  changeBusInfo,
  postSpecialBusInfo,
  changeIsNewBus,
} = async;

const initState = {
  cars: [],
  pagination: {},
  specialBusInfo: {},
  isNewBusInfo: false, // 用来判断是否是新建一个车辆信息
  visible: false,
  isFetching: false,
  isRejected: false,
  isResolve: false,
};

const filterBusInfo = (carsInfo) => {
  const result = [];
  carsInfo.forEach(car => {
    result.push({
      useUnit: car.useUnit,
      selfNum: car.selfNum,
      licenseNum: car.licenseNum,
      vin: car.vin,
      vehModel: car.vehModel,
      workMileage: car.workMileage,
      repairUnit: car.repairUnit,
      driveLicenceRegDate: car.driveLicenceRegDate,
    });
  });
  return result;
};

const cars = (state = initState, action) => {
  switch (action.type) {
    case changeIsNewBus.TYPE:
      return {
        ...state,
        isNewBusInfo: action.payload,
      };
    case postSpecialBusInfo.TYPE:
      return {
        ...state,
        specialBusInfo: action.payload,
      };
    case fetchBusInfo.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchBusInfo.SUCCESS:
      return {
        ...state,
        cars: filterBusInfo(action.payload.data),
        isFetching: false,
        isResolve: false,
      };
    case fetchBusInfo.FAILURE:
      return {
        ...state,
        isRejected: true,
      };
    case UPDATE_PAGINATION:
      return {
        ...state,
        pagination: action.pagination,
      };
    case changeDrawerVisible.TYPE:
      return {
        ...state,
        visible: action.payload,
      };
    case changeBusInfo.TYPE:
      return {
        ...state,
        cars: action.payload,
      };
    default:
      return state;
  }
};

export default cars;
