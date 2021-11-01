import React from 'react';

import { render, screen } from 'utils/testUtils';

import { menuItemsDesktop } from '../../config/items';
// import { MENU_TEST_ID_PREFIX } from '../MenuItem';
import MenuDesktop, { TEST_ID, ITEM_TEST_ID } from './MenuDesktop';

describe('<MenuDesktop />', () => {
  describe('render', () => {
    it('should render correctly', () => {
      render(<MenuDesktop />);

      expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    });

    it('should contain available items', () => {
      const { getByText } = render(<MenuDesktop />);

      Object.values(menuItemsDesktop).forEach((name) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });
  });
});
