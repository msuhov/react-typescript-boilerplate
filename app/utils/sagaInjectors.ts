import { Store } from 'redux';
import invariant from 'invariant';
import { isNotEmpty } from 'ramda-adjunct';

import { InjectSagaDescriptor } from 'store/models';

import { SagaInjectorConfig } from './models';
import { SagaInjectorMode } from './constants';

const checkKey = (key: string) =>
  invariant(
    isNotEmpty(key),
    '(app/utils...) injectSaga: Expected `key` to be a non empty string',
  );

export function injectSagaFactory(store: Store) {
  return function injectSaga(config: SagaInjectorConfig, ...args: any[]) {
    const { key, saga, mode = SagaInjectorMode.Daemon } = config;

    checkKey(key);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor: InjectSagaDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga &&
        mode !== SagaInjectorMode.Daemon &&
        mode !== SagaInjectorMode.OnceTillUnmount)
    ) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = {
        saga,
        mode,
        task: store.runSaga(saga, ...args),
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

export function ejectSagaFactory(store: Store) {
  return function ejectSaga(key: string) {
    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== SagaInjectorMode.Daemon) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          // @ts-ignore
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store: Store) {
  return {
    injectSaga: injectSagaFactory(store),
    ejectSaga: ejectSagaFactory(store),
  };
}
