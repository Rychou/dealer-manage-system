/* This module composes root reducer including react-router. */
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import companies from './Index/reducer';
import monitors from './BusMonitor/reducer';
import buses from './BusManagement/reducer';
import busDetail from './BusDetail/reducer';
import busReport from './BusReport/reducer';

/**
 * This is a create reducer function.
 * It returns current permanent and asynchronously loaded reducers.
 * @param  {function} asyncReducers - asynchronously loaded recuders.
 * @return {object} - root reducer.
 */
export default function createReducer(asyncReducers) {
  /**
   * Return root reducer.
   * Name of each leaf store should match Page Name or Functionality Name.
   */
  return combineReducers({
    /* Permanent redux reducers. */
    router,
    /* Aync reducers. */
    ...asyncReducers,
    companies,
    monitors,
    buses,
    busDetail,
    busReport,
  });
}
