import React from 'react';

import { renderWithRouter, screen } from 'utils/testUtils';

import { menuItemsDesktop } from '../../config/items';
import { MENU_TEST_ID_PREFIX } from '../MenuItem';
import MenuDesktop, { MENU_DESKTOP_TEST_ID } from './MenuDesktop';

describe('<MenuDesktop />', () => {
  describe('render', () => {
    it('should render correctly', () => {
      renderWithRouter(<MenuDesktop />);
      const result = screen.getByTestId(MENU_DESKTOP_TEST_ID);

      expect(result).toBeInTheDocument();
    });

    it('should contain available items', () => {
      renderWithRouter(<MenuDesktop />);

      Object.values(menuItemsDesktop).forEach((name) => {
        const result = screen.getByTestId(
          `${MENU_TEST_ID_PREFIX}${name?.toLowerCase()}`,
        );

        expect(result).toBeInTheDocument();
      });
    });
  });
});
