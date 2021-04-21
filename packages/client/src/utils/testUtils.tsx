import React, { FC, ReactElement } from 'react';
import {
  render as rtlRender,
  cleanup,
  RenderOptions,
} from '@testing-library/react';
import { ThemeProvider } from '@beans/theme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { InterfaceProvider } from 'context/InterfaceContext';
import theme from 'theme';
import store from 'store';
import Auth from 'features/Auth';
import rootReducer from 'store/rootReducer';

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

const render = (
  ui: ReactElement,
  {
    initialState,
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunkMiddleware),
    ),
    ...renderOptions
  }: any = {},
) => {
  const history = createMemoryHistory();
  store.dispatch = jest.fn();

  const Wrapper = ({ children }: any) => {
    return (
      <ThemeProvider theme={theme}>
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

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

const renderWithProviders = (ui: ReactElement, options?: RenderOptions) =>
  rtlRender(ui, { ...options, wrapper: WithAllProviders });

const renderWithTheme = (ui: ReactElement, options?: RenderOptions) =>
  rtlRender(ui, { ...options, wrapper: WithThemeProvider });

const renderWithRouter = (ui: ReactElement, options?: RenderOptions) =>
  rtlRender(ui, { ...options, wrapper: WithRouterProvider });

const cleanupAfterEach = () => afterEach(cleanup);

export * from '@testing-library/react';

export {
  render,
  renderWithProviders,
  renderWithTheme,
  renderWithRouter,
  cleanupAfterEach,
};
