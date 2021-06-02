import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';

import BasePage from '../BasePage';
import { CreateNetwork } from 'features/Network';

const Networks: FC = () => {
  return (
    <div data-testid={`${PAGE_PREFIX}${Page.NETWORKS}`}>
      <BasePage renderMain={() => <CreateNetwork />} />
    </div>
  );
};

export default Networks;
