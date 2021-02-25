import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { renderWithTheme } from 'utils/testUtils';
import { itemsDesktop } from '../../config/items';
import MenuDesktop, { menuDesktopTestId } from './MenuDesktop';
import { menuItemTestString } from '../MenuItem';

describe('Menu feature', () => {
  const history = createMemoryHistory();

  const renderWithRouter = () =>
    renderWithTheme(
      <Router history={history}>
        <MenuDesktop />
      </Router>,
    );

  describe('MenuDesktop', () => {
    it('should render correctly', () => {
      renderWithRouter();
      const result = screen.getByTestId(menuDesktopTestId);

      expect(result).toBeInTheDocument();
    });

    it('should contain available items', () => {
      renderWithRouter();

      itemsDesktop.forEach(({ name }) => {
        const result = screen.getByTestId(`${menuItemTestString}${name}`);

        expect(result).toBeInTheDocument();
      });
    });
  });
});
