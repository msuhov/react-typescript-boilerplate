/**
 * Test injectors
 */

import { createMemoryHistory } from 'history';
import { put } from 'redux-saga/effects';
import { render } from 'react-testing-library';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../store';
import { useInjectSaga } from '../injectSaga';
import { SagaInjectorMode } from '../constants';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

const memoryHistory = createMemoryHistory();
const injectors = {
  injectSaga: jest.fn(),
  ejectSaga: jest.fn(),
};

jest.mock('utils/history', () => () => memoryHistory);
jest.mock('../sagaInjectors', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => injectors),
}));

describe('useInjectSaga hook', () => {
  let ComponentWithSaga: React.FC<any>;

  beforeEach(() => {
    ComponentWithSaga = () => {
      useInjectSaga({
        key: 'test',
        saga: testSaga,
        mode: SagaInjectorMode.Daemon,
      });
      return null;
    };
    jest.clearAllMocks();
  });

  it('should inject given saga and mode', () => {
    const props = { test: 'test' };
    render(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith({
      key: 'test',
      saga: testSaga,
      mode: SagaInjectorMode.Daemon,
    });
  });

  it('should eject on unmount with a correct saga key', () => {
    const props = { test: 'test' };
    const { unmount } = render(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );
    unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });
});
