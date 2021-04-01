import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import Button from '@beans/button';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Heading, { Size, Color } from 'features/Heading';
import { SmallTile } from 'features/Tile';
import { Wrapper, ListContainer } from './styled';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { normalizeImage } from 'utils/content';
import { FilterPayload, DEFAULT_PAGINATION } from 'utils/storeHelper';
import { Filter } from '../../config/types';
import { getList, getCount, listSelector, clear } from '../../store';
import { useScrollContainer } from 'context/ScrollContainerContext';

type Props = {
  filter?: Filter;
};

const NetworkList: FC<Props> = ({ filter }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<FilterPayload>();

  const scrollContainer = useScrollContainer();

  const {
    meta: { total },
    isLoading,
  } = useStore((state) => state.networks);
  const list = useSelector(listSelector);
  const hasMore = useMemo(() => list.length < total, [list, total]);

  const loadNetworks = useCallback(
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
    (async () => {
      if (filters) {
        await dispatch(clear());
        await dispatch(getCount(filters));
      }
    })();
  }, [filters]);

  useEffect(() => {
    let where;
    switch (filter) {
      case 'ALL': {
        where = undefined;
        break;
      }
      case 'YOUR_NETWORKS': {
        where = [{ createdBy_eq: 1 }];
        break;
      }
      case 'YOU_MANAGE': {
        where = [{ managers_contains: 1 }];
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
        New Networks
      </Heading>
      <ListContainer>
        <InfiniteScroll
          key={filter} // unique key for unmount when switch filter
          loadMore={loadNetworks}
          hasMore={!isLoading && hasMore}
          pageStart={-1}
          loader={Loader}
          threshold={0}
          getScrollParent={() => scrollContainer!.current}
          useWindow={false}
        >
          {list.map(({ id, title, image }) => (
            <SmallTile
              link='/networks'
              renderAction={() => (
                <Button variant='primary' onClick={() => console.log('test')}>
                  Join
                </Button>
              )}
              id={id}
              key={id}
              title={title}
              participants={300}
              image={normalizeImage(image)}
            />
          ))}
        </InfiniteScroll>
      </ListContainer>
    </Wrapper>
  );
};

export default NetworkList;
