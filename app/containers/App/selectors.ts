import { createSelector } from 'reselect';

const selectRouter = (state: any) => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    (routerState: any) => routerState.location,
  );

export { makeSelectLocation };
