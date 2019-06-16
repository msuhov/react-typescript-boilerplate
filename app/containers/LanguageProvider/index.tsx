/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { RootState } from 'store';

import { selectLanguageLocale } from './selectors';

interface Props {
  children: ReactNode;
  messages?: any;
}

interface StateProps {
  locale: string;
}

export const LanguageProvider: React.FC<StateProps & Props> = props => (
  <IntlProvider
    locale={props.locale}
    key={props.locale}
    messages={props.messages[props.locale]}
  >
    {React.Children.only(props.children)}
  </IntlProvider>
);

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  locale: selectLanguageLocale,
});

export default connect(mapStateToProps)(LanguageProvider);
