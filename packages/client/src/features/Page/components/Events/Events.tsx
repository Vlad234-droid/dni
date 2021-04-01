import React, { FC, useCallback, useState } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';
import Heading from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import ButtonFilter from 'features/ButtonFilter';
import { EventCarousel, EventList, EventTable } from 'features/Events';

const ON_AIR = 'ON_AIR';
const THIS_MONTH = 'THIS_MONTH';

const filters = [
  {
    key: ON_AIR,
    title: 'On-air',
    active: true,
  },
  {
    key: THIS_MONTH,
    title: 'This month',
    active: false,
  },
];

type Filter = typeof ON_AIR | typeof THIS_MONTH;

const TEST_ID = 'container-events';

const Events: FC = () => {
  const [filter, setFilter] = useState<Filter>(ON_AIR);
  const { isMobile } = useMedia();

  const renderMain = useCallback(
    () => (
      <div data-testid={TEST_ID}>
        <PageHeader
          renderLeft={() => <Heading>Events</Heading>}
          renderCenter={() => (
            <ButtonFilter
              initialFilters={filters}
              onChange={(key) => setFilter(key as Filter)}
            />
          )}
        />
        <PageWrapper>
          <EventCarousel />
          <EventList filter={filter} />
          <EventTable />
        </PageWrapper>
      </div>
    ),
    [isMobile, filter],
  );

  return (
    <div data-testid={`${PAGE_PREFIX}${Page.EVENTS}`}>
      <BasePage renderMain={renderMain} />
    </div>
  );
};

export default Events;
