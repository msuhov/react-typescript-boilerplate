import { createSelector } from 'reselect';

import { RootState } from '../../store';

const selectRouter = (state: RootState) => state.router;

export const selectLocation = createSelector(
  selectRouter,
  routerState => routerState!.location,
);
