import React, { FC, ReactElement } from 'react';
import { render as rtlRender, cleanup, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@beans/theme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { InterfaceProvider } from 'context/InterfaceContext';
import theme from 'theme';
import store from 'store';
import Auth, { AuthProvider } from 'features/Auth';
import rootReducer from 'store/rootReducer';
import { UserRole } from 'features/User';
import GlobalModal from 'features/GlobalModal';
import { NotificationProvider } from '../features/Notification';

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
            <GlobalModal>
              <Router history={history}>{children}</Router>
            </GlobalModal>
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
    store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware)),
    roles = [UserRole.EMPLOYEE],
    events = [],
    networks = [],
    ...renderOptions
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any = {},
) => {
  const history = createMemoryHistory();

  const Wrapper: FC = ({ children }) => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider
          value={{
            authenticated: true,
            user: {
              id: 111,
              name: 'mocked-user-name',
              preferred_username: 'mocked-user-name',
              events,
              networks,
              roles,
              colleagueUUID: '111',
            },
            fetchUser: jest.fn(),
          }}
        >
          <InterfaceProvider>
            <GlobalModal>
              <Router history={history}>{children}</Router>
            </GlobalModal>
          </InterfaceProvider>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

type AuthOptions = {
  authenticated: boolean;
  user: {
    events: number[];
    networks: number[];
    roles: string[];
  };
};

const renderWithProviders = (ui: ReactElement, options?: RenderOptions, authOptions?: AuthOptions) =>
  rtlRender(ui, { ...options, ...authOptions, wrapper: WithAllProviders });

const renderWithTheme = (ui: ReactElement, options?: RenderOptions) =>
  rtlRender(ui, { ...options, wrapper: WithThemeProvider });

const renderWithRouter = (ui: ReactElement, options?: RenderOptions) =>
  rtlRender(ui, { ...options, wrapper: WithRouterProvider });

const cleanupAfterEach = () => afterEach(cleanup);

const getMathId = (url: string, exp: RegExp) => {
  const res = url.match(exp);
  if (res!.length == 2) {
    return res![1];
  }

  return 0;
};

export { act, cleanup, createEvent, fireEvent, screen, waitFor, within } from '@testing-library/react';

export { render, renderWithProviders, renderWithTheme, renderWithRouter, cleanupAfterEach, getMathId };
