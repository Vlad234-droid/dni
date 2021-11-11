import React from 'react';

import { render, screen } from 'utils/testUtils';
import { UserRole } from 'features/User';
import { Page } from 'features/Page';

import { menuItemsDesktop } from '../../config/items';
import MenuDesktop, { TEST_ID } from './MenuDesktop';

describe('<MenuDesktop />', () => {
  describe('render', () => {
    it('should render wrapper', () => {
      render(<MenuDesktop />);

      expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    });

    it('should contain all menu items, if Admin user', () => {
      const initialState = { auth: { user: { roles: [UserRole.ADMIN] } } };
      const { getByText } = render(<MenuDesktop />, { initialState });

      Object.values(menuItemsDesktop).forEach((name) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });

    it('should contain all menu items, if Manager user', () => {
      const initialState = { auth: { user: { roles: [UserRole.MANAGER] } } };
      const { getByText } = render(<MenuDesktop />, { initialState });

      Object.values(menuItemsDesktop).forEach((name) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });

    it('should contain all menu items except Reports, if Employee user', () => {
      const initialState = { auth: { user: { roles: [UserRole.EMPLOYEE] } } };
      const { getByText, queryByText } = render(<MenuDesktop />, { initialState });

      Object.values(menuItemsDesktop).forEach((name) => {
        if (name === menuItemsDesktop[Page.REPORTS]) {
          expect(queryByText(name)).not.toBeInTheDocument();
        } else {
          expect(getByText(name)).toBeInTheDocument();
        }
      });
    });
  });
});
