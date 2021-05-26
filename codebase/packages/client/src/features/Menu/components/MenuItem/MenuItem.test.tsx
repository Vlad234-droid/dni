import React from 'react';
import { css } from 'styled-components';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { renderWithRouter } from 'utils/testUtils';
import MenuItem, { MENU_TEST_ID_PREFIX } from './MenuItem';

describe('<MenuItem />', () => {
  describe('#render', () => {
    const menuItem = {
      name: 'About',
      page: 'about',
      styles: `color: red;`,
      stylesActive: css`
        color: green;
      `,
    };
    const history = createMemoryHistory();

    const render = () =>
      renderWithRouter(
        <Switch>
          <Route path='/' exact>
            <MenuItem {...menuItem}>
              <div>{menuItem.name}</div>
            </MenuItem>
          </Route>
          <Route path='/about'>
            <MenuItem {...menuItem}>
              <div>{menuItem.name}</div>
            </MenuItem>
          </Route>
        </Switch>,
      );

    const menuItemTestId = `${MENU_TEST_ID_PREFIX}${menuItem.name?.toLowerCase()}`;

    it('should render correctly', () => {
      render();
      const result = screen.getByTestId(menuItemTestId);

      expect(result).toBeInTheDocument();
    });

    it('should change history location', () => {
      render();
      const menuItemLink = screen.getByTestId(menuItemTestId);
      const expected = '/';
      userEvent.click(menuItemLink);

      const result = history.location.pathname;

      expect(result).toEqual(expected);
    });
  });
});
