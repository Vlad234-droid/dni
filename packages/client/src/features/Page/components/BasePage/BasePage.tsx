import React, { FC } from 'react';

import Layout, { ExtraLayoutProps } from 'features/Layout';
import { Page } from 'features/Page';
import Header from 'features/Header';

import Content from './Content';

const BasePage: FC<ExtraLayoutProps> = (props) => (
  <div data-testid={Page.NEWS_FEED}>
    <Layout
      renderHeader={() => <Header />}
      renderFooter={() => <div data-testid='footer'>Footer</div>}
      renderLeft={() => <Content />}
      {...props}
    />
  </div>
);

export default BasePage;
