import React from 'react';
import { render } from 'react-testing-library';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';

import store from '../../../store';

import ConnectedLanguageProvider, { LanguageProvider } from '../index';

import { translationMessages } from '../../../i18n';

const defaultMessage = 'This is some default message';
const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage,
  },
});

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const { container } = render(
      <LanguageProvider messages={messages} locale="en">
        {children}
      </LanguageProvider>,
    );
    expect(container.firstChild).not.toBeNull();
  });
});

describe('<ConnectedLanguageProvider />', () => {
  it('should render the default language messages', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>,
    );
    expect(queryByText(defaultMessage)).not.toBeNull();
  });
});
