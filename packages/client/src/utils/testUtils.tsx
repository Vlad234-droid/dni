import React, { FC, ReactElement } from 'react';
import merge from 'lodash.merge';
import { render, RenderOptions } from '@testing-library/react';
import { defaultTheme, ThemeProvider } from '@beans/theme';
import { Provider } from 'react-redux';

import theme from 'theme';
import store from 'store';
import Auth from 'features/Auth';

const WithThemeProvider: FC = ({ children }) => (
  <ThemeProvider theme={merge(defaultTheme, theme)}>
    <div>{children}</div>
  </ThemeProvider>
);

const WithAllProviders: FC = ({ children }) => (
  <ThemeProvider>
    <Provider store={store}>
      <Auth>{children}</Auth>
    </Provider>
  </ThemeProvider>
);

const renderWithProviders = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { ...options, wrapper: WithAllProviders });

const renderWithTheme = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { ...options, wrapper: WithThemeProvider });

export * from '@testing-library/react';

export { renderWithProviders, renderWithTheme };
