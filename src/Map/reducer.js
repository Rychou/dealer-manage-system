import { async } from './actions';
import blueBus from '../../static/icon/blueBus.png';
import redBus from '../../static/icon/redBus.png';

const { fetchMapData } = async;

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
    default:
      return state;
  }
};

export default Map;
