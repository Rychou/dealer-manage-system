import async from './actions';

const {
  updatePagination,
  fetchReport,
} = async;

const initState = {
  reports: [],
  pagination: {},
  isResolved: false,
  isFetching: false,
  isRejected: false,
};

const report = (state = initState, action) => {
  switch (action.type) {
    case updatePagination.TYPE:
      return {
        ...state,
        pagination: action.payload,
      };
    case fetchReport.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchReport.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isResolved: true,
        reports: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default report;
