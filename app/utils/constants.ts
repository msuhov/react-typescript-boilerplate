export enum SagaInjectorMode {
  RestartOnRemount = '@@saga-injector/restart-on-remount',
  Daemon = '@@saga-injector/daemon',
  OnceTillUnmount = '@@saga-injector/once-till-unmount',
}
