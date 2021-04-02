import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import Button from '@beans/button';
import { useSelector } from 'react-redux';
import Icon from '@beans/icon';

import Heading, { Size, Color } from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { firstDayOf, lastDayOf } from 'utils/date';
import { FilterPayload, DEFAULT_PAGINATION } from 'utils/storeHelper';
import List from 'features/List';

import { getList, listSelector, clear, getCount } from '../../store';
import { Filter } from '../../config/types';
import { Wrapper } from './styled';

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
  const events = useSelector(listSelector);
  const hasMore = useMemo(() => events.length < total, [events, total]);

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
    let where;
    switch (filter) {
      case 'ON_AIR': {
        const currentDate = new Date();
        where = [
          { startedAt_lte: currentDate },
          { finishedAt_gte: currentDate },
        ];
        break;
      }
      case 'THIS_MONTH': {
        const firstDayOfThisMonth = firstDayOf('month');
        const lastDayOfThisMonth = lastDayOf('month');
        where = [
          { startedAt_gte: firstDayOfThisMonth },
          { startedAt_lgte: lastDayOfThisMonth },
        ];
        break;
      }
    }
    setFilters({ ...filters, _where: JSON.stringify(where) });
  }, [filter]);

  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        New Events
      </Heading>
      <List
        link='/events'
        // TODO: event is not correct type Event
        //@ts-ignore
        items={events}
        hideParticipants={true}
        isMobile={isMobile}
        renderAction={() => (
          <Button variant='primary' onClick={() => console.log('test')}>
            Take part
          </Button>
        )}
      />
      <Button
        disabled={!hasMore || isLoading}
        variant='secondary'
        onClick={() => setPage(page + 1)}
      >
        More New Events
        <Icon graphic='expand' size='xx' />
      </Button>
    </Wrapper>
  );
};

export default EventList;
