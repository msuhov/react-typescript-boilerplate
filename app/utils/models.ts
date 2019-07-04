import { Saga } from 'redux-saga';
import { Reducer } from 'redux';

import { SagaInjectorMode } from './constants';

export interface SagaInjectorConfig {
  key: string;
  saga: Saga;
  mode?: SagaInjectorMode;
}

export interface ReducerInjectorConfig {
  key: string;
  reducer: Reducer<any, any>;
}
