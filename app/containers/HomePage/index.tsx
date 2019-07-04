import React, { useCallback } from 'react';
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

export const HomePage: React.FC<Props> = props => {
  const onClick = useCallback(() => {
    props.changeLocale({ locale: 'de' });
  }, []);

  return (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <div>Locale: {props.locale}</div>
      <button onClick={onClick} type="button">
        Change locale
      </button>
    </div>
  );
};

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
