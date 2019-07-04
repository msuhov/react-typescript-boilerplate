import { createStandardAction } from 'typesafe-actions';

export const prefix = 'app/LanguageToggle';

export const changeLocale = createStandardAction(`${prefix}/CHANGE_LOCALE`)<{
  locale: string;
}>();
