import React, { FC, ReactElement } from 'react';
import { render, cleanup, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@beans/theme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { InterfaceProvider } from 'context/InterfaceContext';

import theme from 'theme';
import store from 'store';
import Auth from 'features/Auth';

const WithThemeProvider: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>{children}</div>
  </ThemeProvider>
);

const WithRouterProvider: FC = ({ children }) => {
  const history = createMemoryHistory();

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>{children}</Router>
    </ThemeProvider>
  );
};

const WithAllProviders: FC = ({ children }) => {
  const history = createMemoryHistory();

  return (
    <ThemeProvider>
      <Provider store={store}>
        <Auth>
          <InterfaceProvider>
            <Router history={history}>{children}</Router>
          </InterfaceProvider>
        </Auth>
      </Provider>
    </ThemeProvider>
  );
};

const renderWithProviders = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { ...options, wrapper: WithAllProviders });

const renderWithTheme = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { ...options, wrapper: WithThemeProvider });

const renderWithRouter = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { ...options, wrapper: WithRouterProvider });

const cleanupAfterEach = () => afterEach(cleanup);

export * from '@testing-library/react';

export {
  renderWithProviders,
  renderWithTheme,
  renderWithRouter,
  cleanupAfterEach,
};
