/*
 *
 * LanguageProvider actions
 *
 */

import { createStandardAction } from 'typesafe-actions';

const prefix = 'app/LanguageToggle';
const actionTypes = {
  CHANGE_LOCALE: `${prefix}/CHANGE_LOCALE`,
};

export const changeLocale = createStandardAction(actionTypes.CHANGE_LOCALE)<{
  locale: string;
}>();
