import React, { FC, useCallback } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { Link } from 'react-router-dom';

import { Page, PAGE_PREFIX } from 'features/Page';
import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';
import Heading from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import ButtonFilter from 'features/ButtonFilter';
import EventCarousel from 'features/EventCarousel';
import EventTable from 'features/EventTable';
import EventList from 'features/EventList';

import { filters } from './data';

const TEST_ID = 'container-events';

const Events: FC = () => {
  const { isMobile } = useMedia();

  const renderMain = useCallback(
    () => (
      <div data-testid={TEST_ID}>
        <PageHeader
          renderLeft={() => <Heading>Events</Heading>}
          renderRight={() => (
            <Link to={`/${Page.CREATE_EVENTS}`}>
              <Button variant='primary'>
                <Icon graphic='add' />
                {!isMobile && 'Create an Event'}
              </Button>
            </Link>
          )}
          renderCenter={() => (
            <ButtonFilter
              filters={filters}
              onChange={() => console.log('test')}
            />
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
