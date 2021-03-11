import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { renderWithTheme, screen } from 'utils/testUtils';
import { itemsUpdates } from '../../config/items';
import MenuUpdates, { TEST_ID } from './NetworkUpdates';
import { MENU_TEST_ID_PREFIX } from '../MenuItem';

describe('Menu feature', () => {
  const history = createMemoryHistory();

  const renderWithRouter = () =>
    renderWithTheme(
      <Router history={history}>
        <MenuUpdates />
      </Router>,
    );

  describe('MenuUpdates', () => {
    it('should render correctly', () => {
      renderWithRouter();
      const result = screen.getByTestId(TEST_ID);

      expect(result).toBeInTheDocument();
    });

    it('should contain available items', () => {
      renderWithRouter();

      itemsUpdates.forEach(({ name }) => {
        const result = screen.getByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).toBeInTheDocument();
      });
    });
  });
});
