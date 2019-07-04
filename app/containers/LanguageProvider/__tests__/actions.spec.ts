import { prefix, changeLocale } from '../actions';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: `${prefix}/CHANGE_LOCALE`,
        payload: {
          locale: 'de',
        },
      };
      expect(changeLocale({ locale: 'de' })).toEqual(expected);
    });
  });
});
