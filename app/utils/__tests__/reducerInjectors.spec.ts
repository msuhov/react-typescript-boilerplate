/**
 * Test injectors
 */

import produce from 'immer';
import { Action, Reducer, Store } from 'redux';
import { createMemoryHistory } from 'history';

import store from '../../store';

import reducerInjectors, { injectReducerFactory } from '../reducerInjectors';
import { ReducerInjectorConfig } from '../models';

const memoryHistory = createMemoryHistory();
jest.mock('utils/history', () => () => memoryHistory);

// Fixtures
const initialState = { reduced: 'soon' };

/* eslint-disable default-case, no-param-reassign */
const reducer: Reducer<any, Action> = (state = initialState, action: any) =>
  produce(state, (draft: any) => {
    if (action.type === 'TEST') {
      draft.reduced = action.payload;
    }
  });

const secondReducer: Reducer<any, Action> = (state: Store) => state;

describe('reducer injectors', () => {
  let injectors: {
    injectReducer(config: ReducerInjectorConfig): void;
  };

  describe('injectReducer helper', () => {
    beforeEach(() => {
      store.injectedReducers = {};
      injectors = reducerInjectors(store);
    });

    it("should validate a reducer and reducer's key", () => {
      expect(() => injectors.injectReducer({ key: '', reducer })).toThrow();
    });

    it('given a store, it should provide a function to inject a reducer', () => {
      injectors.injectReducer({ key: 'test', reducer });

      // @ts-ignore Ignore test injected reducer
      const actual = store.getState().test;
      expect(actual).toEqual(initialState);
    });
  });
  describe('injectReducer store replaceReducer', () => {
    beforeEach(() => {
      store.replaceReducer = jest.fn();
      store.injectedReducers = {};
      injectors.injectReducer = injectReducerFactory(store);
    });

    it('should not assign reducer if already existing', () => {
      injectors.injectReducer({ key: 'test', reducer });
      injectors.injectReducer({ key: 'test', reducer });

      expect(store.replaceReducer).toHaveBeenCalledTimes(1);
    });

    it('should assign reducer if different implementation for hot reloading', () => {
      injectors.injectReducer({ key: 'test', reducer });
      injectors.injectReducer({ key: 'test', reducer: secondReducer });

      expect(store.replaceReducer).toHaveBeenCalledTimes(2);
    });
  });
});
