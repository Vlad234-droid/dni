import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { renderWithTheme, screen } from 'utils/testUtils';
import { itemsMobile } from '../../config/items';
import MenuMobile, {
  MOBILE_MENU_TEST_ID,
  MOBILE_MORE_TEST_ID,
} from './MenuMobile';
import { MENU_TEST_ID_PREFIX } from '../MenuItem';

describe('Menu feature', () => {
  const history = createMemoryHistory();

  const renderWithRouter = () =>
    renderWithTheme(
      <Router history={history}>
        <MenuMobile />
      </Router>,
    );

  describe('MenuMobile', () => {
    it('should render correctly', () => {
      renderWithRouter();
      const result = screen.getByTestId(MOBILE_MENU_TEST_ID);

      expect(result).toBeInTheDocument();
    });

    it('should contain available visible items', () => {
      renderWithRouter();

      itemsMobile.visible.forEach(({ name }) => {
        const result = screen.getByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).toBeInTheDocument();
      });
    });

    it('should show available hidden items on menu open', () => {
      renderWithRouter();
      const buttonMore = screen.getByTestId(MOBILE_MORE_TEST_ID);

      userEvent.click(buttonMore);

      itemsMobile.hidden.forEach(({ name }) => {
        const result = screen.getByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).toBeInTheDocument();
      });
    });

    it('should hide available hidden items on menu close', () => {
      renderWithRouter();
      const buttonMore = screen.getByTestId(MOBILE_MORE_TEST_ID);

      userEvent.click(buttonMore);
      userEvent.click(buttonMore);

      itemsMobile.hidden.forEach(({ name }) => {
        const result = screen.queryByTestId(`${MENU_TEST_ID_PREFIX}${name}`);

        expect(result).not.toBeInTheDocument();
      });
    });
  });
});
