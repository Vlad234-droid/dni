import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { renderWithProviders } from 'utils/testUtils';
import { buildPublicPath } from 'config/api';

import BasePage from './BasePage';

describe('<BasePage />', () => {
  const renderMain = () => <div data-testid='mocked-center' />;
  const history = createMemoryHistory();

  const render = () =>
    renderWithProviders(
      <Router history={history}>
        <Route path={ buildPublicPath('/') }>
          <BasePage renderMain={renderMain} />,
        </Route>
      </Router>,
    );

  it('should render wrapper', () => {
    const { getByTestId } = render();

    expect(getByTestId('base-page')).toBeInTheDocument();
  });

  it('should render all base layout components', () => {
    const { getByTestId } = render();

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('menu')).toBeInTheDocument();
  });

  it('should render components received from props', () => {
    const { getByTestId } = render();

    expect(getByTestId('mocked-center')).toBeInTheDocument();
  });
});
