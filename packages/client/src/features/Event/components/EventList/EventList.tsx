import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import Button from '@beans/button';
import { useSelector } from 'react-redux';
import Icon from '@beans/icon';
import isEmpty from 'lodash.isempty';

import Heading, { Size, Color } from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { firstDayOf, lastDayOf } from 'utils/date';
import { FilterPayload, DEFAULT_PAGINATION } from 'utils/storeHelper';
import List from 'features/List';
import { EmptyContainer } from 'features/Common';
import { Page } from 'features/Page';

import { getList, listSelector, clear, getCount } from '../../store';
import { Filter } from '../../config/types';
import { Wrapper } from './styled';
import EventAction from '../EventAction';

type Props = {
  filter?: Filter;
};

const EventList: FC<Props> = ({ filter }) => {
  const { isMobile } = useMedia();
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [filters, setFilters] = useState<FilterPayload>();

  const {
    meta: { total },
    isLoading,
  } = useStore((state) => state.events);
  const list = useSelector(listSelector);
  const hasMore = useMemo(() => list.length < total, [list, total]);

  const loadEvents = useCallback(
    (page: number) => {
      if (filters && hasMore && !isLoading) {
        dispatch(
          getList({
            ...filters,
            ...{
              ...DEFAULT_PAGINATION,
              _start: page * DEFAULT_PAGINATION._limit,
            },
          }),
        );
      }
    },
    [filters, hasMore, isLoading],
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
    let where = {};
    switch (filter) {
      case 'ON_AIR': {
        const currentDate = new Date();
        where = { startDate_lte: currentDate, endDate_gte: currentDate };
        break;
      }
      case 'THIS_MONTH': {
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
      <Heading size={Size.md} color={Color.black}>
        New Events
      </Heading>
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
            hideParticipants={true}
            isMobile={isMobile}
            renderAction={(id) => <EventAction id={id} />}
          />
          <Button
            disabled={!hasMore || isLoading}
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
