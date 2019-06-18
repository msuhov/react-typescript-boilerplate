import { selectLanguage } from '../selectors';
import { initialState, LanguageState } from '../reducer';

describe('selectLanguage', () => {
  it('should select the global state', () => {
    const globalState: LanguageState = {
      locale: 'de',
    };
    const mockedState = {
      language: globalState,
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });

  it('should select the initial state', () => {
    const mockedState = {};
    expect(selectLanguage(mockedState)).toEqual(initialState);
  });
});
