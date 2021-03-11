import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';

const Events: FC = () => {
  return <div data-testid={`${PAGE_PREFIX}${Page.NOT_FOUND}`}>404</div>;
};

export default Events;
