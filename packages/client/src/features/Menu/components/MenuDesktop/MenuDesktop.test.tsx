import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { renderWithTheme, screen } from 'utils/testUtils';

import { menuItems } from '../../config/items';
import { MENU_TEST_ID_PREFIX } from '../MenuItem';
import MenuDesktop, { MENU_DESKTOP_TEST_ID } from './MenuDesktop';

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
      const result = screen.getByTestId(MENU_DESKTOP_TEST_ID);

      expect(result).toBeInTheDocument();
    });

    it('should contain available items', () => {
      renderWithRouter();

      Object.values(menuItems).forEach((name) => {
        const result = screen.getByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).toBeInTheDocument();
      });
    });
  });
});
