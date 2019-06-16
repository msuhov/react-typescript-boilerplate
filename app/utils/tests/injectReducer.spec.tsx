/**
 * Test injectors
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Action, Reducer, Store } from 'redux';
import { render } from 'react-testing-library';
import { createMemoryHistory } from 'history';

import { useInjectReducer } from '../injectReducer';
import store from '../../store';

// Fixtures

const reducer: Reducer<any, Action> = (state: Store) => state;

const memoryHistory = createMemoryHistory();
const injectors = {
  injectReducer: jest.fn(),
};

jest.mock('utils/history', () => () => memoryHistory);
jest.mock('../reducerInjectors', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => injectors),
}));

describe('useInjectReducer hook', () => {
  let ComponentWithReducer: React.FC;

  beforeAll(() => {
    ComponentWithReducer = () => {
      useInjectReducer({ key: 'test', reducer });
      return null;
    };
  });

  it('should inject a given reducer', () => {
    render(
      <Provider store={store}>
        <ComponentWithReducer />
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith({
      key: 'test',
      reducer,
    });
  });
});
