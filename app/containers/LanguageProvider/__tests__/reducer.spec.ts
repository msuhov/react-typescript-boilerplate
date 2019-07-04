import languageProviderReducer from '../reducer';
import { changeLocale } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual({
      locale: 'en',
    });
  });

  it('changes the locale', () => {
    const action = changeLocale({ locale: 'de' });
    const actual = languageProviderReducer(undefined, action);
    const expected = {
      locale: 'de',
    };

    expect(actual).toEqual(expected);
  });
});
