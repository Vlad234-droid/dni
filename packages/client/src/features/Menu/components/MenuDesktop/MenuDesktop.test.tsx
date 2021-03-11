import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { renderWithTheme, screen } from 'utils/testUtils';
import { itemsDesktop } from '../../config/items';
import MenuDesktop, { MENU_DESKTOP_TEST_ID } from './MenuDesktop';
import { MENU_TEST_ID_PREFIX } from '../MenuItem';

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

      itemsDesktop.forEach(({ name }) => {
        const result = screen.getByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).toBeInTheDocument();
      });
    });
  });
});
