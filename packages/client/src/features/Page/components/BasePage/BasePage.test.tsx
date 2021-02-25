import React from 'react';

import { renderWithTheme } from 'utils/testUtils';

import BasePage from './BasePage';

describe('#BasePage', () => {
  const renderCenter = () => <div data-testid='mocked-center' />;
  const renderRight = () => <div data-testid='mocked-right' />;

  it('should render all base layout components', () => {
    const { getByTestId } = renderWithTheme(
      <BasePage renderCenter={renderCenter} />,
    );

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('menu-desktop-test-id')).toBeInTheDocument();
    expect(getByTestId('menu-updates-test-id')).toBeInTheDocument();
  });

  it('should render components received from props', () => {
    const { getByTestId } = renderWithTheme(
      <BasePage renderCenter={renderCenter} renderRight={renderRight} />,
    );

    expect(getByTestId('mocked-center')).toBeInTheDocument();
    expect(getByTestId('mocked-right')).toBeInTheDocument();
  });
});
