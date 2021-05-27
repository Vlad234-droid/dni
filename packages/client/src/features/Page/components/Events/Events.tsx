import React, { FC, useCallback } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import Heading, { Size, Color } from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import { EventCarousel, EventList, EventTable } from 'features/Event';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapperNew';

const TEST_ID = 'container-events';

const Events: FC = () => {
  const { isMobile } = useMedia();

  const renderMain = useCallback(
    () => (
      <div data-testid={TEST_ID}>
        <PageWrapper
          pageName='Events'
          renderContent={() => (
            <>
              <EventCarousel />
              <EventList />
              <EventTable />
            </>
          )}
        />
      </div>
    ),
    [isMobile],
  );

  return (
    <div data-testid={`${PAGE_PREFIX}${Page.EVENTS}`}>
      <BasePage renderMain={renderMain} />
    </div>
  );
};

export default Events;
