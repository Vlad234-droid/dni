import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import Button from '@beans/button';
import { useSelector } from 'react-redux';
import Icon from '@beans/icon';
import isEmpty from 'lodash.isempty';

import ButtonFilter from 'features/ButtonFilter';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { firstDayOf, lastDayOf } from 'utils/date';
import { FilterPayload } from 'types/payload';
import { DEFAULT_PAGINATION, DEFAULT_FILTERS } from 'config/constants';
import List from 'features/List';
import { EmptyContainer } from 'features/Common';
import { Page } from 'features/Page';

import {
  getList,
  listSelector,
  clear,
  getCount,
  getParticipants,
} from '../../store';
import { Filter, ALL, THIS_WEEK, THIS_MONTH } from '../../config/types';
import { Wrapper } from './styled';
import EventAction from '../EventAction';

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

const EventList: FC = () => {
  const { isMobile } = useMedia();
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<Filter>(ALL);
  const [filters, setFilters] = useState<FilterPayload>();

  const {
    participants,
    meta: { total },
    loading,
  } = useStore((state) => state.events);
  const { networks = [] } = useStore((state) => state.auth.user);
  const list = useSelector(listSelector);
  const hasMore = useMemo(() => list.length < total, [list, total]);

  const loadEvents = useCallback(
    (page: number) => {
      if (filters && hasMore && !(loading === 'pending')) {
        dispatch(
          getList({
            ...filters,
            ...{
              ...DEFAULT_PAGINATION,
              ...DEFAULT_FILTERS,
              _start: page * DEFAULT_PAGINATION._limit,
              network_in: [...networks, -1],
            },
          }),
        );
      }
    },
    [filters, hasMore, loading, networks],
  );

  useEffect(() => {
    if (filters && hasMore) {
      loadEvents(page);
    }
  }, [filters, page, hasMore]);

  useEffect(() => {
    (async () => {
      if (filters) {
        await dispatch(clear());
        setPage(0);
        await dispatch(getCount(filters));
      }
    })();
  }, [filters]);

  useEffect(() => {
    dispatch(getParticipants());
  }, []);

  useEffect(() => {
    let where = {};
    switch (filter) {
      case ALL: {
        where = {};
        break;
      }
      case THIS_WEEK: {
        const firstDayOfThisMonth = firstDayOf('week').toJSDate();
        const lastDayOfThisMonth = lastDayOf('week').toJSDate();
        where = {
          startDate_gte: firstDayOfThisMonth,
          startDate_lte: lastDayOfThisMonth,
        };
        break;
      }
      case THIS_MONTH: {
        const firstDayOfThisMonth = firstDayOf('month').toJSDate();
        const lastDayOfThisMonth = lastDayOf('month').toJSDate();
        where = {
          startDate_gte: firstDayOfThisMonth,
          startDate_lte: lastDayOfThisMonth,
        };
        break;
      }
    }
    setFilters(where);
  }, [filter]);

  return (
    <Wrapper>
      <ButtonFilter
        initialFilters={initialFilters}
        onChange={(key) => setFilter(key as Filter)}
      />
      {isEmpty(list) ? (
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
            items={list}
            hideMaxParticipants={false}
            participants={participants}
            isMobile={isMobile}
            renderAction={(id, disabled) => (
              <EventAction id={id} disabled={disabled} />
            )}
          />
          <Button
            disabled={!hasMore || loading === 'pending'}
            variant='secondary'
            onClick={() => setPage(page + 1)}
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
