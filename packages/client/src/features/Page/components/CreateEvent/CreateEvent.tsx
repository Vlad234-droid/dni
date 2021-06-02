import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { CreateEvent } from 'features/Event';

import BasePage from '../BasePage';

const Networks: FC = () => {
  return (
    <div data-testid={`${PAGE_PREFIX}${Page.EVENTS}`}>
      <BasePage renderMain={() => <CreateEvent />} />
    </div>
  );
};

export default Networks;
