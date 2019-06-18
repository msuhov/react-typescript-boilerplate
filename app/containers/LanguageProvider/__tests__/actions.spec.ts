import { changeLocale } from '../actions';

import { CHANGE_LOCALE } from '../constants';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        payload: {
          locale: 'de',
        },
      };
      expect(changeLocale({ locale: 'de' })).toEqual(expected);
    });
  });
});
