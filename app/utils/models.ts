import { Saga } from 'redux-saga';
import { Action, Reducer, Store } from 'redux';

import { SagaInjectorMode } from './constants';

export interface SagaInjectorConfig {
  key: string;
  saga: Saga;
  mode?: SagaInjectorMode;
}

export interface ReducerInjectorConfig {
  key: string;
  reducer: Reducer<Store<any, Action>, Action>;
}
