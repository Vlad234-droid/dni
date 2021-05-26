import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Page, PAGE_PREFIX } from 'features/Page';
import { renderWithProviders, screen, act } from 'utils/testUtils';

import Routes from './Routes';

describe('Routes main component', () => {
  const history = createMemoryHistory();
  const renderRoutes = () =>
    renderWithProviders(
      <Router history={history}>
        <React.StrictMode>
          <Routes />
        </React.StrictMode>
      </Router>,
    );

  for (const [key, value] of Object.entries(Page)) {
    it(`should render correct page for ${key}`, () => {
      act(() => history.push(value));
      renderRoutes();
      expect(screen.getByTestId(`${PAGE_PREFIX}${value}`)).toBeInTheDocument();
    });
  }
});
