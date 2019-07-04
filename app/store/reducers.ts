/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

type InjectedReducers = {};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(
  injectedReducers: Partial<InjectedReducers> = {},
) {
  return combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
}
