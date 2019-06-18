/**
 * Test injectors
 */

import { put } from 'redux-saga/effects';
import { createMemoryHistory } from 'history';
import { Task } from 'redux-saga';

import store from '../../store';

import getSagaInjectors from '../sagaInjectors';
import { SagaInjectorConfig } from '../models';
import { SagaInjectorMode } from '../constants';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

const memoryHistory = createMemoryHistory();
jest.mock('utils/history', () => () => memoryHistory);

describe('injectors', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let injectors: {
    injectSaga: (config: SagaInjectorConfig, ...args: any[]) => void;
    ejectSaga: (key: string) => void;
  };
  const getMockedTask = (): Task => ({
    cancel: jest.fn(),
    error: jest.fn(),
    isCancelled: jest.fn(),
    isRunning: jest.fn(),
    result: jest.fn(),
    setContext: jest.fn(),
    toPromise: jest.fn(),
  });

  describe('ejectSaga helper', () => {
    beforeEach(() => {
      store.injectedSagas = {};
      injectors = getSagaInjectors(store);
    });

    it('should cancel a saga in RESTART_ON_REMOUNT mode', () => {
      const task = getMockedTask();

      store.injectedSagas.test = {
        task,
        mode: SagaInjectorMode.RestartOnRemount,
        saga: testSaga,
      };
      injectors.ejectSaga('test');

      expect(task.cancel).toHaveBeenCalled();
    });

    it('should not cancel a daemon saga', () => {
      const task = getMockedTask();

      store.injectedSagas.test = {
        task,
        mode: SagaInjectorMode.Daemon,
        saga: testSaga,
      };
      injectors.ejectSaga('test');

      expect(task.cancel).not.toHaveBeenCalled();
    });

    it('should ignore saga that was not previously injected', () => {
      expect(() => injectors.ejectSaga('test')).not.toThrow();
    });

    it("should remove non daemon saga's descriptor in production", () => {
      process.env.NODE_ENV = 'production';
      injectors.injectSaga({
        key: 'test',
        saga: testSaga,
        mode: SagaInjectorMode.RestartOnRemount,
      });
      injectors.injectSaga({
        key: 'test1',
        saga: testSaga,
        mode: SagaInjectorMode.OnceTillUnmount,
      });

      injectors.ejectSaga('test');
      injectors.ejectSaga('test1');

      expect(store.injectedSagas.test).toBe('done');
      expect(store.injectedSagas.test1).toBe('done');
      process.env.NODE_ENV = originalNodeEnv;
    });

    it("should not remove daemon saga's descriptor in production", () => {
      process.env.NODE_ENV = 'production';
      injectors.injectSaga({
        key: 'test',
        saga: testSaga,
      });
      injectors.ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
      process.env.NODE_ENV = originalNodeEnv;
    });

    it("should not remove daemon saga's descriptor in development", () => {
      injectors.injectSaga({
        key: 'test',
        saga: testSaga,
      });
      injectors.ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
    });
  });

  describe('injectSaga helper', () => {
    beforeEach(() => {
      store.injectedSagas = {};
      store.runSaga = jest.fn();
      injectors = getSagaInjectors(store);
    });

    it("should validate saga's key", () => {
      expect(() => injectors.injectSaga({ key: '', saga: testSaga })).toThrow();
    });

    it('should pass args to saga.run', () => {
      const args = [1, 2];
      injectors.injectSaga(
        {
          key: 'test',
          saga: testSaga,
          mode: SagaInjectorMode.Daemon,
        },
        args,
      );

      expect(store.runSaga).toHaveBeenCalledWith(testSaga, args);
    });

    it('should not start daemon and once-till-unmount sagas if were started before', () => {
      injectors.injectSaga({
        key: 'test1',
        saga: testSaga,
        mode: SagaInjectorMode.Daemon,
      });
      injectors.injectSaga({
        key: 'test1',
        saga: testSaga,
        mode: SagaInjectorMode.Daemon,
      });
      injectors.injectSaga({
        key: 'test2',
        saga: testSaga,
        mode: SagaInjectorMode.OnceTillUnmount,
      });
      injectors.injectSaga({
        key: 'test2',
        saga: testSaga,
        mode: SagaInjectorMode.OnceTillUnmount,
      });

      expect(store.runSaga).toHaveBeenCalledTimes(2);
    });

    it('should start any saga that was not started before', () => {
      injectors.injectSaga({ key: 'test1', saga: testSaga });
      injectors.injectSaga({
        key: 'test2',
        saga: testSaga,
        mode: SagaInjectorMode.Daemon,
      });
      injectors.injectSaga({
        key: 'test3',
        saga: testSaga,
        mode: SagaInjectorMode.OnceTillUnmount,
      });

      expect(store.runSaga).toHaveBeenCalledTimes(3);
    });

    it('should restart a saga if different implementation for hot reloading', () => {
      const task = getMockedTask();
      store.injectedSagas.test = {
        saga: testSaga,
        task,
        mode: SagaInjectorMode.Daemon,
      };

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectors.injectSaga({ key: 'test', saga: testSaga1 });

      expect(task.cancel).toHaveBeenCalledTimes(1);
      expect(store.runSaga).toHaveBeenCalledWith(testSaga1);
    });

    it('should not cancel saga if different implementation in production', () => {
      process.env.NODE_ENV = 'production';
      const task = getMockedTask();
      store.injectedSagas.test = {
        saga: testSaga,
        task,
        mode: SagaInjectorMode.RestartOnRemount,
      };

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectors.injectSaga({
        key: 'test',
        saga: testSaga1,
        mode: SagaInjectorMode.Daemon,
      });

      expect(task.cancel).toHaveBeenCalledTimes(0);
      process.env.NODE_ENV = originalNodeEnv;
    });
  });
});
