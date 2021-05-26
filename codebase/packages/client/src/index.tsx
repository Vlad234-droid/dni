import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@beans/theme';

import { InterfaceProvider } from 'context/InterfaceContext';
import { NotificationProvider } from 'context/NotificationContext';
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

ReactDOM.render(
  <ThemeProvider theme={theme} globalStyles={globalThemeStyles}>
    <Provider store={store}>
      <Auth>
        <InterfaceProvider>
          <NotificationProvider>
            <Router history={history}>
              <React.StrictMode>
                <GlobalStyle />
                <Routes />
              </React.StrictMode>
            </Router>
          </NotificationProvider>
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
