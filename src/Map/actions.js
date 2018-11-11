import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'map',
  actions: ['fetchMapData', 'fetchBusInfo'],
});

export const UPDATE_INFOWINDOW = 'UPDATE_INFOWINDOW';
