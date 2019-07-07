import { Saga } from 'redux-saga';
import { Reducer } from 'redux';

export enum SagaInjectorMode {
  RestartOnRemount = '@@saga-injector/restart-on-remount',
  Daemon = '@@saga-injector/daemon',
  OnceTillUnmount = '@@saga-injector/once-till-unmount',
}

export interface SagaInjectorConfig {
  key: string;
  saga: Saga;
  mode?: SagaInjectorMode;
}

export interface ReducerInjectorConfig {
  key: string;
  reducer: Reducer<any, any>;
}
