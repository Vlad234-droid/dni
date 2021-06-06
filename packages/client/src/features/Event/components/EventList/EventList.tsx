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
import { Type, VerticalTile } from 'features/Tile';

import Event, { Filter } from '../../config/types';
import { initialListFilters } from '../../config/filters';
import {
  getPayloadPeriod,
  getPayloadWhere,
  isActionDisabled,
} from '../../utils';
import EventAction from '../EventAction';
import EventParticipants from '../EventParticipants';
import { Wrapper } from './styled';

const TEST_ID = 'events-list';

type Props = {
  events?: Event[];
  loading: Loading;
  loadEvents: (filters: EntityListPayload) => void;
  loadCount: (filters: EntityListPayload) => void;
  loadParticipants: () => void;
  handleClear: () => void;
  participants?: Record<number, number>;
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
      return <EmptyContainer description='Nothing to show' />;

    return (
      <>
        <List
          type={Type.NARROW}
          link={Page.EVENTS}
          //@ts-ignore
          items={events}
          renderAction={(id, maxParticipants) => (
            <EventAction
              id={id}
              disabled={isActionDisabled(participants![id], maxParticipants)}
            />
          )}
          renderDateTime={(startDate) => <div>{startDate}</div>}
          renderParticipants={(id, maxParticipants) => (
            <EventParticipants
              maxParticipants={maxParticipants}
              participants={participants![id]}
            />
          )}
        />
        {isLoading && <Spinner />}
        {!isEmpty(events) && hasMore && (
          <Button
            disabled={isLoading}
            variant='secondary'
            onClick={onPageChange}
          >
            More New Events
            <Icon graphic='expand' size='xx' />
          </Button>
        )}
      </>
    );
  }, [error, loading, events, participants, total]);

  return (
    <Wrapper data-testid={TEST_ID}>
      <ButtonFilter
        initialFilters={initialListFilters}
        onChange={(key) => handleFilterChange(key as Filter)}
        name='eventList'
      />
      {memoizedContent}
    </Wrapper>
  );
};

export default EventList;
