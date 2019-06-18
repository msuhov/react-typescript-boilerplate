/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLanguageLocale } from 'containers/LanguageProvider/selectors';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { RootState } from 'store';

import messages from './messages';

interface StateProps {
  locale: string;
}

interface DispatchProps {
  changeLocale: typeof changeLocale;
}

type Props = StateProps & DispatchProps;

export const HomePage: React.FC<Props> = props => (
  <div>
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
    <div>Locale: {props.locale}</div>
    <button
      onClick={() => {
        throw Error('asd');
        props.changeLocale({ locale: 'de' });
      }}
      type="button"
    >
      Change locale
    </button>
  </div>
);

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  locale: selectLanguageLocale,
});

const mapDispatchToProps = {
  changeLocale,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(HomePage);
