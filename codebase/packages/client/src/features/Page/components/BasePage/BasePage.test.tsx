import React from 'react';

import { render } from 'utils/testUtils';

import BasePage from './BasePage';

describe('<BasePage />', () => {
  const renderMain = () => <div data-testid='mocked-center' />;

  it('should render wrapper', () => {
    const { getByTestId } = render(<BasePage renderMain={renderMain} />);

    expect(getByTestId('base-page')).toBeInTheDocument();
  });

  it('should render all base layout components', () => {
    const { getByTestId } = render(<BasePage renderMain={renderMain} />);

    expect(getByTestId('header-link')).toBeInTheDocument();
    expect(getByTestId('header-main')).toBeInTheDocument();
    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('should render network updates and links, id desktop version', () => {
    const { getByTestId, getByText } = render(<BasePage renderMain={renderMain} />);

    expect(getByTestId('network-updates')).toBeInTheDocument();
    expect(getByText('Terms & Conditions')).toBeInTheDocument();
    expect(getByText('Privacy Policy')).toBeInTheDocument();
  });

  // TODO:
  // it('should render menu-mobile, if mobile version', () => {
  //   const { getByTestId } = render(<BasePage renderMain={renderMain} />);
  //
  //   expect(getByTestId('menu-mobile')).toBeInTheDocument();
  // });
});
