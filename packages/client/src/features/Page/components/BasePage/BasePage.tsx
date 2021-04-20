import React, { FC } from 'react';

import Layout, { ExtraLayoutProps } from 'features/Layout';
import Header from 'features/Header';
import Menu from 'features/Menu';

const TEST_ID = 'base-page';

const BasePage: FC<ExtraLayoutProps> = (props) => (
  <div data-testid={TEST_ID}>
    <Layout
      renderHeader={() => <Header />}
      renderLeft={() => <Menu />}
      {...props}
    />
  </div>
);

export { TEST_ID };

export default BasePage;
