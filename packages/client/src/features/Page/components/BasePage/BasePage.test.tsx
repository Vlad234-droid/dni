import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { renderWithTheme } from 'utils/testUtils';

import BasePage from './BasePage';

describe('#BasePage', () => {
  const renderMain = () => <div data-testid='mocked-center' />;
  const history = createMemoryHistory();
  it('should render all base layout components', () => {
    const { getByTestId } = renderWithTheme(
      <Router history={history}>
        <Route path={'/'}>
          <BasePage renderMain={renderMain} />,
        </Route>
      </Router>,
    );

    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('should render components received from props', () => {
    const { getByTestId } = renderWithTheme(
      <Router history={history}>
        <Route path={'/'}>
          <BasePage renderMain={renderMain} />,
        </Route>
      </Router>,
    );

    expect(getByTestId('mocked-center')).toBeInTheDocument();
  });
});
