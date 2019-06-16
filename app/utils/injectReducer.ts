import React from 'react';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';
import { ReducerInjectorConfig } from './models';

/**
 * Dynamically injects a reducer
 *
 * @param {ReducerInjectorConfig} config Key and Reducer to inject
 *
 */

const useInjectReducer = (config: ReducerInjectorConfig) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(config);
  }, []);
};

export { useInjectReducer };
