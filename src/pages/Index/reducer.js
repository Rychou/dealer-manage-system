import { FETCH_INDEX, RESOLVE_INDEX, REJECT } from './antions';

const initState = {
  data: [],
  isFetching: false,
  isRejected: false,
  isResolve: false,
};

/**
 * compute companys data from fetched data
 *
 * @param {*} companys
 * @returns
 */
const computeCompanys = companys => {
  let carCount = 0; // 车辆总数
  let outCount = 0; // 出车总数
  let monitoringCount = 0; // 监控总数
  const temArr = companys.map(company => {
    carCount += company.carCount;
    outCount += company.outCount;
    monitoringCount += company.monitoringCount;
    const outPercent = Math.floor((company.outCount / company.carCount) * 100); // 出车占比
    const monitoringPercent = Math.floor((company.monitoringCount / company.carCount) * 100); // 监控占比
    return {
      ...company,
      outPercent,
      monitoringPercent,
    };
  });
  return {
    carCount,
    outCount,
    monitoringCount,
    companys: temArr,
  };
};

const companys = (state = initState, action) => {
  switch (action.type) {
    case FETCH_INDEX:
      return {
        ...state,
        isFetching: true,
      };
    case RESOLVE_INDEX:
      return {
        ...state,
        data: computeCompanys(action.companys),
        isFetching: false,
        isResolve: true,
      };
    case REJECT:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

export default companys;
