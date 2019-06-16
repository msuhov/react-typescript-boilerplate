import invariant from 'invariant';
import { isEmpty } from 'ramda';
import { Store } from 'redux';

import createReducer from '../store/reducers';

import { ReducerInjectorConfig } from './models';

export function injectReducerFactory(store: Store) {
  return function injectReducer(config: ReducerInjectorConfig) {
    const { key, reducer } = config;
    invariant(
      !isEmpty(key),
      '(app/utils...) injectReducer: Expected `key` to be not empty string',
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: Store) {
  return {
    injectReducer: injectReducerFactory(store),
  };
}
