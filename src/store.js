/**
 * This module composes redux store instance.
 * Redux store manages many complex states for the app.
 */
import { createStore } from 'redux';
import createReducer from './reducer';

let store = {};
/**
 * Factory composing react store with reducers and middlewares.
 * @param  {Object} initialState - An instance by calling applyMiddleware.
 */
function configureStore(initialState) {
  store = createStore(createReducer(), initialState);

  // Enable Webpack hot module replacement for reducers
  // if (module.hot) {
  //   module.hot.accept('./reducer', () => {
  //     store.replaceReducer(createReducer(store.asyncReducers));
  //   });
  // }

  /**
   * Extensions.
   * Async reducer registry, adding an extra attribute to the store object.
   */
  store.asyncReducers = {};

  return store;
}

export { store };
export default configureStore;
