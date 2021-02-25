import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { renderWithTheme, screen } from 'utils/testUtils';
import { itemsMobile } from '../../config/items';
import MenuMobile, {
  menuMobileTestId,
  menuButtonMoreTestId,
} from './MenuMobile';
import { menuItemTestString } from '../MenuItem';

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
      const result = screen.getByTestId(menuMobileTestId);

      expect(result).toBeInTheDocument();
    });

    it('should contain available visible items', () => {
      renderWithRouter();

      itemsMobile.visible.forEach(({ name }) => {
        const result = screen.getByTestId(`${menuItemTestString}${name}`);

        expect(result).toBeInTheDocument();
      });
    });

    it('should show available hidden items on menu open', () => {
      renderWithRouter();
      const buttonMore = screen.getByTestId(menuButtonMoreTestId);

      userEvent.click(buttonMore);

      itemsMobile.hidden.forEach(({ name }) => {
        const result = screen.getByTestId(`${menuItemTestString}${name}`);

        expect(result).toBeInTheDocument();
      });
    });

    it('should hide available hidden items on menu close', () => {
      renderWithRouter();
      const buttonMore = screen.getByTestId(menuButtonMoreTestId);

      userEvent.click(buttonMore);
      userEvent.click(buttonMore);

      itemsMobile.hidden.forEach(({ name }) => {
        const result = screen.queryByTestId(`${menuItemTestString}${name}`);

        expect(result).not.toBeInTheDocument();
      });
    });
  });
});
