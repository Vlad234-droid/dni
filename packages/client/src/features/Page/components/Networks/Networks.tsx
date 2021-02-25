import React, { FC } from 'react';

import { Page } from 'features/Page';

import BasePage from '../BasePage';

const Networks: FC = () => (
  <div data-testid={Page.NETWORKS}>
    <BasePage renderCenter={() => <div data-testid='networks'>Networks</div>} />
  </div>
);

export default Networks;
