import React, { FC } from 'react';

import Layout, { ExtraLayoutProps } from 'features/Layout';
import { Page } from 'features/Page';
import Header from 'features/Header';
import Menu from 'features/Menu';

const BasePage: FC<ExtraLayoutProps> = (props) => (
  <div data-testid={Page.NEWS_FEED}>
    <Layout
      renderHeader={() => <Header />}
      renderLeft={() => <Menu />}
      {...props}
    />
  </div>
);

export default BasePage;
