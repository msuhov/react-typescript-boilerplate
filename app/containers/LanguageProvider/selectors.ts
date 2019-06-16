import { createSelector } from 'reselect';

import { RootState } from 'store';

import { initialState } from './reducer';

export const selectLanguage = (state: RootState) =>
  state.language || initialState;

export const selectLanguageLocale = createSelector(
  selectLanguage,
  language => language.locale,
);
