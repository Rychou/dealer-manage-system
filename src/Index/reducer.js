import { async } from './antions';

const { fetchCompanies } = async;

const initState = {
  companies: [],
  isFetching: false,
  isRejected: false,
  isResolve: false,
};

/**
 * compute companys data from fetched data
 *
 * @param {*} companies
 * @returns
 */
const computeCompanys = companies => {
  let carCount = 0; // 车辆总数
  let outCount = 0; // 出车总数
  let monitoringCount = 0; // 监控总数
  const temArr = companies.map(company => {
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
    companies: temArr,
  };
};

const companies = (state = initState, action) => {
  switch (action.type) {
    case fetchCompanies.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchCompanies.SUCCESS:
      return {
        ...state,
        companies: computeCompanys(action.payload.companies),
        isFetching: false,
        isResolve: true,
      };
    case fetchCompanies.FAILURE:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    default:
      return state;
  }
};

export default companies;
