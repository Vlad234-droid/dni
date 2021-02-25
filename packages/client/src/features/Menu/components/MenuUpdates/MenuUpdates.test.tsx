import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { renderWithTheme } from 'utils/testUtils';
import { itemsUpdates } from '../../config/items';
import MenuUpdates, { menuUpdatesTestId } from './MenuUpdates';
import { menuItemTestString } from '../MenuItem';

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
      const result = screen.getByTestId(menuUpdatesTestId);

      expect(result).toBeInTheDocument();
    });

    it('should contain available items', () => {
      renderWithRouter();

      itemsUpdates.forEach(({ name }) => {
        const result = screen.getByTestId(`${menuItemTestString}${name}`);

        expect(result).toBeInTheDocument();
      });
    });
  });
});
