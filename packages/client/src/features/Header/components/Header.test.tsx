import React from 'react';

import { renderWithProviders, screen } from 'utils/testUtils';

import Header from './Header';

describe('Header feature', () => {
  it('should render correctly', () => {
    renderWithProviders(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('should render user links', () => {
    renderWithProviders(<Header />);
    const links = screen.getByTestId('links');
    expect(links).toBeInTheDocument();
  });
});
