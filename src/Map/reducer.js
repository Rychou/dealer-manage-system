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
  isFetching: false,
  isRejected: false,
  isResolved: false,
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
