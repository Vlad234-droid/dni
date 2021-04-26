import React, { FC, useCallback } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';
import Heading, { Size, Color } from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import { EventCarousel, EventList, EventTable } from 'features/Event';

const TEST_ID = 'container-events';

const Events: FC = () => {
  const { isMobile } = useMedia();

  const renderMain = useCallback(
    () => (
      <div data-testid={TEST_ID}>
        <PageHeader
          renderLeft={() => <Heading>Events</Heading>}
          renderCenter={() => (
            <Heading size={Size.md} color={Color.black}>
              Upcoming events
            </Heading>
          )}
        />
        <PageWrapper>
          <EventCarousel />
          <EventList />
          <EventTable />
        </PageWrapper>
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
