import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter, screen } from 'utils/testUtils';
import { menuItemsMobile } from '../../config/items';
import MenuMobile, { MOBILE_MENU_TEST_ID } from './MenuMobile';
import { MENU_TEST_ID_PREFIX } from '../MenuItem';

describe('<MenuMobile />', () => {
  describe('#render', () => {
    it('should render correctly', () => {
      renderWithRouter(<MenuMobile />);
      const result = screen.getByTestId(MOBILE_MENU_TEST_ID);

      expect(result).toBeInTheDocument();
    });

    it('should contain available visible items', () => {
      renderWithRouter(<MenuMobile />);

      Object.values(menuItemsMobile.visible).forEach((name) => {
        const result = screen.getByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).toBeInTheDocument();
      });
    });
  });

  describe('#handleMoreClick', () => {
    it('should show available hidden items on menu open', () => {
      renderWithRouter(<MenuMobile />);
      const buttonMore = screen.getByTestId('menu-more-button');

      userEvent.click(buttonMore);

      Object.values(menuItemsMobile.hidden).forEach((name) => {
        const result = screen.getByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).toBeInTheDocument();
      });
    });

    it('should hide available hidden items on menu close', () => {
      renderWithRouter(<MenuMobile />);
      const buttonMore = screen.getByTestId('menu-more-button');

      userEvent.click(buttonMore);
      userEvent.click(buttonMore);

      Object.values(menuItemsMobile.hidden).forEach((name) => {
        const result = screen.queryByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).not.toBeInTheDocument();
      });
    });
  });
});
