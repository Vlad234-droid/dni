import React, { FC } from 'react';

import { Page } from 'features/Page';

import BasePage from '../BasePage';

const Events: FC = () => (
  <div data-testid={Page.EVENTS}>
    <BasePage renderCenter={() => <div data-testid='events'>Events</div>} />
  </div>
);

export default Events;
