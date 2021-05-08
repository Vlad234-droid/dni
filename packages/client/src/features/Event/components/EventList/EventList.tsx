import React, { FC, useEffect, useMemo } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import isEmpty from 'lodash.isempty';

import ButtonFilter from 'features/ButtonFilter';
import { useMedia } from 'context/InterfaceContext';
import { EntityListPayload } from 'types/payload';
import { DEFAULT_PAGINATION, DEFAULT_FILTERS } from 'config/constants';
import List from 'features/List';
import { EmptyContainer, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import { Loading } from 'store/types';

import Event, { Filter, ALL, THIS_WEEK, THIS_MONTH } from '../../config/types';
import EventAction from '../EventAction';
import { getPayloadWhere } from '../../utils';
import { Wrapper } from './styled';

const TEST_ID = 'events-list';

const initialFilters = [
  {
    key: ALL,
    title: 'All',
    active: true,
  },
  {
    key: THIS_WEEK,
    title: 'This week',
    active: false,
  },
  {
    key: THIS_MONTH,
    title: 'This month',
    active: false,
  },
];

type Props = {
  events?: Event[];
  loading: Loading;
  loadEvents: (filters: EntityListPayload) => void;
  loadCount: (filters: EntityListPayload) => void;
  loadParticipants: () => void;
  handleClear: () => void;
  participants?: Record<number, number>;
  total: number;
  networks: number[];
  page: number;
  onPageChange: () => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

const EventList: FC<Props> = ({
  events,
  total,
  loading,
  loadEvents,
  loadCount,
  loadParticipants,
  handleClear,
  participants,
  networks,
  page,
  onPageChange,
  filter,
  onFilterChange,
}) => {
  const { isMobile } = useMedia();

  const hasMore = useMemo(() => events && events.length < total, [
    events,
    total,
  ]);

  const isLoading = useMemo(() => loading === Loading.PENDING, [loading]);

  useEffect(() => {
    // TODO: move to avoid unnecessary reassignment
    const filters = {
      ...DEFAULT_PAGINATION,
      ...DEFAULT_FILTERS,
      ...getPayloadWhere(filter),
      network_in: [...networks, -1],
    };

    if (!total) {
      //@ts-ignore
      loadCount(filters);
    }

    //@ts-ignore
    loadEvents({ ...filters, _start: page * DEFAULT_PAGINATION._limit });
  }, [networks, hasMore, page, total, filter]);

  useEffect(() => {
    handleClear();
  }, [filter]);

  useEffect(() => {
    if (!isEmpty(participants)) return;

    loadParticipants();
  }, []);

  if (loading == Loading.IDLE) return null;

  if (loading === Loading.FAILED) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <div>Here some error</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ButtonFilter
        initialFilters={initialFilters}
        onChange={(key) => onFilterChange(key as Filter)}
      />
      {!isLoading && isEmpty(events) && !hasMore ? (
        <EmptyContainer
          description='Unfortunately, we did not find any matches for your request'
          explanation='Please change your filtering criteria to try again.'
        />
      ) : (
        <>
          <List
            link={Page.EVENTS}
            // TODO: event is not correct type Event
            //@ts-ignore
            items={events}
            hideMaxParticipants={false}
            participants={participants}
            isMobile={isMobile}
            renderAction={(id, disabled) => (
              <EventAction id={id} disabled={disabled} />
            )}
          />
          {isLoading && <Spinner />}
          <Button
            disabled={!hasMore || loading === 'pending'}
            variant='secondary'
            onClick={onPageChange}
          >
            More New Events
            <Icon graphic='expand' size='xx' />
          </Button>
        </>
      )}
    </Wrapper>
  );
};

export default EventList;
