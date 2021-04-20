import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { renderWithTheme, screen } from 'utils/testUtils';
import { MENU_TEST_ID_PREFIX } from 'features/Menu';

import { items } from '../config/items';
import NetworkUpdates from './NetworkUpdates';
import { TEST_ID } from './styled';

describe('Menu feature', () => {
  const history = createMemoryHistory();

  const renderWithRouter = () =>
    renderWithTheme(
      <Router history={history}>
        <NetworkUpdates />
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

      items.forEach(({ name }) => {
        const result = screen.getByTestId(
          `${MENU_TEST_ID_PREFIX}${name?.toLowerCase()}`,
        );

        expect(result).toBeInTheDocument();
      });
    });
  });
});
