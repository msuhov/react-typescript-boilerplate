/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';
import { createReducer, ActionType, getType } from 'typesafe-actions';

import { DEFAULT_LOCALE } from '../../i18n';

import * as actions from './actions';

export type LanguageState = Readonly<{
  locale: string;
}>;

export const initialState: LanguageState = {
  locale: DEFAULT_LOCALE,
};

function changeLocaleHandler(
  state: LanguageState,
  action: ActionType<typeof actions.changeLocale>,
) {
  return produce(state, draft => {
    draft.locale = action.payload.locale;
  });
}

export default createReducer(initialState, {
  [getType(actions.changeLocale)]: changeLocaleHandler,
});
