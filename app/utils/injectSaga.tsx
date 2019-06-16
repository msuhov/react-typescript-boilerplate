import React from 'react';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';
import { SagaInjectorConfig } from './models';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {SagaInjectorConfig} config Inject saga config
 * on component mount and never canceled or started again. Another two options:
 *   - SagaInjectorMode.RestartOnRemount — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - SagaInjectorMode.OnceTillUnmount — behaves like 'RestartOnRemount' but never runs it again.
 *
 */

export const useInjectSaga = (config: SagaInjectorConfig) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    const injectors = getInjectors(context.store);
    injectors.injectSaga(config);

    return () => {
      injectors.ejectSaga(config.key);
    };
  }, []);
};
