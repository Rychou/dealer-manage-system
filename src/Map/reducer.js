import { async, UPDATE_INFOWINDOW } from './actions';
import blueBus from '../../static/icon/blueBus.png';
import redBus from '../../static/icon/redBus.png';

const { fetchMapData, fetchBusInfo } = async;

const initState = {
  points: [],
  styles: [
    {
      url: blueBus,
      anchor: [6, 6],
      size: [12, 12],
    },
    {
      url: redBus,
      anchor: [6, 6],
      size: [12, 12],
    },
  ],
  dashboard: {},
  busInfo: {
    isFetching: false,
    isRejected: false,
    isResolved: false,
  },
  infoWindow: {
    offset: [0, 0],
    visible: false,
    isCustom: false,
    autoMove: true,
    closeWhenClickMap: true,
  },
  isFetching: false,
  isRejected: false,
  isResolved: false,
};

const computeDashBoard = points => {
  let todayTotalMileage = 0;
  const onlineBus = points.length;
  let lowPowerBus = 0;
  for (let i = 0; i < onlineBus; i++) {
    if (points[i].soc < 20) {
      lowPowerBus++;
    }
    todayTotalMileage += points[i].todayMileage;
  }
  return {
    todayTotalMileage,
    onlineBus,
    lowPowerBus,
  };
};

const Map = (state = initState, action) => {
  switch (action.type) {
    case fetchMapData.TYPE:
      return {
        ...state,
        isFetching: true,
      };
    case fetchMapData.SUCCESS:
      return {
        ...state,
        points: action.payload.points.map(point => ({
          ...point,
          style: point.soc < 20 ? 1 : 0,
        })),
        dashboard: computeDashBoard(action.payload.points),
        isFetching: false,
        isResolved: true,
      };
    case fetchMapData.FAIL:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
      };
    case fetchBusInfo.TYPE:
      return {
        ...state,
        busInfo: {
          ...state.busInfo,
          isResolved: false,
          isFetching: true,
        },
      };
    case fetchBusInfo.SUCCESS:
      return {
        ...state,
        busInfo: {
          ...state.busInfo,
          data: action.payload.busInfo,
          isFetching: false,
          isResolved: true,
        },
      };
    case fetchBusInfo.FAIL:
      return {
        ...state,
        busInfo: {
          ...state.busInfo,
          isFetching: false,
          isRejected: true,
        },
      };
    case UPDATE_INFOWINDOW:
      return {
        ...state,
        infoWindow: {
          ...state.infoWindow,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default Map;
