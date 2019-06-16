import Redux from 'redux';
import { Saga, Task } from 'redux-saga';

import { InjectedSagas } from './models';

declare module 'redux' {
  interface Store extends Redux.Store {
    runSaga<S extends Saga>(saga: S, ...args: Parameters<S>): Task;

    injectedReducers: Redux.ReducersMapObject;
    injectedSagas: InjectedSagas;
  }
}
