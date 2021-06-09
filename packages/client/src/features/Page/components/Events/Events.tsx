import React, { FC, useCallback } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import { useMedia } from 'context/InterfaceContext';
import { EventCarousel, EventList, EventTable } from 'features/Event';
import { menuItemsDesktop } from 'features/Menu';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'container-events';

const Events: FC = () => {
  const renderMain = useCallback(
    () => (
      <div data-testid={TEST_ID}>
        <PageWrapper
          pageName={menuItemsDesktop[Page.EVENTS]}
          renderContent={() => (
            <>
              <EventCarousel />
              <EventList />
              <EventTable />
            </>
          )}
          withBorder
        />
      </div>
    ),
    [],
  );

  return (
    <div data-testid={`${PAGE_PREFIX}${Page.EVENTS}`}>
      <BasePage renderMain={renderMain} />
    </div>
  );
};

export default Events;
