import React from 'react';
import { renderWithTheme, screen } from 'utils/testUtils';

import { AuthProvider, defaultValue } from '../../Auth/context/authContext';
import Header from './Header';

describe('Header feature', () => {
  it('should render correctly', () => {
    renderWithTheme(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('should render user links', () => {
    renderWithTheme(<Header />);
    const links = screen.getByTestId('links');
    expect(links).toBeInTheDocument();
  });
});
