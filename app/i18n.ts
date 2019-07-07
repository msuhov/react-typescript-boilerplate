const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const deLocaleData = require('react-intl/locale-data/de');

const enTranslationMessages = require('./translations/en.json');
const deTranslationMessages = require('./translations/de.json');

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

export const DEFAULT_LOCALE = 'en';

export const formatTranslationMessages = (
  locale: string,
  messages: any,
): any => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages: any, key: string) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return {
      ...formattedMessages,
      [key]: formattedMessage,
    };
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
};
