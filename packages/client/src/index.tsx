import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider, defaultTheme } from '@beans/theme';
import merge from 'lodash.merge';

import { InterfaceProvider } from 'context/InterfaceContext';
import store from 'store';
import theme from 'theme';
import GlobalStyle from 'styles';
import history from 'utils/history';
import Auth from 'features/Auth';
import Routes from 'features/Routes';

import reportWebVitals from './reportWebVitals';

const globalThemeStyles = {
  normalize: true,
};
console.log(merge(defaultTheme, theme));
ReactDOM.render(
  <ThemeProvider
    theme={merge(defaultTheme, theme)}
    globalStyles={globalThemeStyles}
  >
    <Provider store={store}>
      <Auth>
        <InterfaceProvider>
          <Router history={history}>
            <React.StrictMode>
              <GlobalStyle />
              <Routes />
            </React.StrictMode>
          </Router>
        </InterfaceProvider>
      </Auth>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your store, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
