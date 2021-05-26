import React, { FC, useCallback, useEffect, useMemo } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import isEmpty from 'lodash.isempty';

import ButtonFilter from 'features/ButtonFilter';
import { EntityListPayload } from 'types/payload';
import { DEFAULT_FILTERS, DEFAULT_PAGINATION } from 'config/constants';
import List from 'features/List';
import { EmptyContainer, Error, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';

import Event, { Filter, Participants } from '../../config/types';
import { ALL, THIS_MONTH, THIS_WEEK } from '../../config/contstants';
import EventAction from '../EventAction';
import { getPayloadPeriod, getPayloadWhere } from '../../utils';
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
  participants?: Participants;
  total: number;
  networks?: number[];
  page: number;
  onPageChange: () => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  error?: string;
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
  error,
}) => {
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );
  const hasMore = useMemo(() => events && events.length < total, [
    events,
    total,
  ]);
  const filters = {
    ...DEFAULT_PAGINATION,
    ...DEFAULT_FILTERS,
    ...getPayloadWhere(networks),
    ...getPayloadPeriod(filter),
  };

  const handleFilterChange = useCallback((filter: Filter) => {
    onFilterChange(filter);

    loadEvents({
      ...filters,
      ...getPayloadPeriod(filter),
      _start: page * DEFAULT_PAGINATION._limit,
    });
  }, []);

  useEffect(() => {
    loadCount(filters);
    loadEvents({ ...filters, _start: page * DEFAULT_PAGINATION._limit });
  }, [networks, page, filter]);

  useEffect(() => {
    handleClear();
  }, [filter]);

  useEffect(() => {
    loadParticipants();
  }, []);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: error }} />;

    if (isEmpty(events) && isLoading) return <Spinner height='500px' />;

    if (loading === Loading.SUCCEEDED && isEmpty(events))
      return (
        <EmptyContainer
          description='Unfortunately, we did not find any matches for your request'
          explanation='Please change your filtering criteria to try again.'
        />
      );

    return (
      <>
        <List
          link={Page.EVENTS}
          //@ts-ignore
          items={events}
          hideMaxParticipants={false}
          participants={participants!.data}
          renderAction={(id, disabled) => (
            <EventAction id={id} disabled={disabled} />
          )}
        />
        {isLoading && <Spinner />}
        <Button
          disabled={!hasMore || isLoading}
          variant='secondary'
          onClick={onPageChange}
        >
          More New Events
          <Icon graphic='expand' size='xx' />
        </Button>
      </>
    );
  }, [error, loading, events, participants, total]);

  return (
    <Wrapper data-testid={TEST_ID}>
      <ButtonFilter
        initialFilters={initialFilters}
        onChange={(key) => handleFilterChange(key as Filter)}
      />
      {memoizedContent}
    </Wrapper>
  );
};

export default EventList;
