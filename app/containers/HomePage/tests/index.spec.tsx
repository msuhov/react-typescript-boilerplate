import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { HomePage } from '../index';

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const changeLocale = jest.fn();
    const {
      container: { firstChild },
      getByText,
    } = render(
      <IntlProvider locale="en">
        <HomePage locale="en" changeLocale={changeLocale} />
      </IntlProvider>,
    );

    fireEvent.click(getByText(/Change locale/i));

    expect(firstChild).toMatchSnapshot();
    expect(changeLocale).toBeCalledWith({ locale: 'de' });
  });
  it('should call changeLocale on click', () => {
    const changeLocale = jest.fn();
    const { getByText } = render(
      <IntlProvider locale="en">
        <HomePage locale="en" changeLocale={changeLocale} />
      </IntlProvider>,
    );

    fireEvent.click(getByText(/Change locale/i));

    expect(changeLocale).toBeCalledWith({ locale: 'de' });
  });
});
