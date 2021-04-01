import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import Button from '@beans/button';
import { useSelector } from 'react-redux';
import Icon from '@beans/icon';

import Heading, { Size, Color } from 'features/Heading';
import { SmallTile } from 'features/Tile';

import { Wrapper, ListContainer } from './styled';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { normalizeImage } from 'utils/content';
import {
  isoDateToFormat,
  firstDayOf,
  lastDayOf,
  FULL_FORMAT,
} from 'utils/date';
import { FilterPayload, DEFAULT_PAGINATION } from 'utils/storeHelper';

import { getList, listSelector, clear, getCount } from '../../store';
import { Filter } from '../../config/types';

type Props = {
  filter?: Filter;
};

const EventList: FC<Props> = ({ filter }) => {
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

  // TODO: add loader component
  const Loader = <div key='loader'>Loading ...</div>;

  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        New Events
      </Heading>
      <ListContainer>
        {list.map(({ id, title, maxParticipants, image, created_at }) => (
          <SmallTile
            link='/events'
            key={`events-${id}`}
            id={id}
            title={title}
            participants={maxParticipants}
            renderAction={() => (
              <Button variant='primary' onClick={() => console.log('test')}>
                Take part
              </Button>
            )}
            renderMeta={() => (
              <span>{isoDateToFormat(created_at, FULL_FORMAT)}</span>
            )}
            image={normalizeImage(image)}
          />
        ))}
        {isLoading && Loader}
      </ListContainer>
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
