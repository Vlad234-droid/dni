import React from 'react';
import { css } from 'styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { renderWithTheme } from 'utils/testUtils';
import MenuItem, { menuItemTestString } from './MenuItem';

describe('Menu feature', () => {
  const menuItem = {
    name: 'About',
    page: 'about',
    styles: `color: red;`,
    stylesActive: css`
      color: green;
    `,
  };

  const history = createMemoryHistory();

  const renderWithRouter = () =>
    renderWithTheme(
      <Router history={history}>
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
        </Switch>
      </Router>,
    );

  const menuItemTestId = `${menuItemTestString}${menuItem.name}`;

  describe('MenuItem', () => {
    it('should render correctly', () => {
      renderWithRouter();
      const result = screen.getByTestId(menuItemTestId);

      expect(result).toBeInTheDocument();
    });

    it('should change history location', () => {
      renderWithRouter();
      const menuItemLink = screen.getByTestId(menuItemTestId);
      const expected = '/' + menuItem.page;
      userEvent.click(menuItemLink);

      const result = history.location.pathname;

      expect(result).toEqual(expected);
    });

    it('should be triggered as active on location changed', () => {
      renderWithRouter();
      const menuItemLink = screen.getByTestId(menuItemTestId);
      userEvent.click(menuItemLink);

      const result = menuItemLink.lastElementChild;

      expect(result).toHaveStyle(`color: green;`);
    });
  });
});
