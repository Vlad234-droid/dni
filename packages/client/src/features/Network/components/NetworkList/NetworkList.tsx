import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import isEmpty from 'lodash.isempty';

import ButtonFilter from 'features/ButtonFilter';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { FilterPayload } from 'types/payload';
import { DEFAULT_PAGINATION } from 'config/constants';
import { useScrollContainer } from 'context/ScrollContainerContext';
import List from 'features/List';
import { useMedia } from 'context/InterfaceContext';
import { EmptyContainer } from 'features/Common';
import { Page } from 'features/Page';

import { Filter, ALL, YOUR_NETWORKS } from '../../config/types';
import { getList, getCount, listSelector, clear } from '../../store';
import { Wrapper, ListContainer } from './styled';
import NetworkAction from '../NetworkAction';

const initialFilters = [
  {
    key: ALL,
    title: 'All',
    active: true,
  },
  {
    key: YOUR_NETWORKS,
    title: 'Your networks',
    active: false,
  },
];

const NetworkList: FC = () => {
  const { isMobile } = useMedia();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<Filter>(ALL);
  const [filters, setFilters] = useState<
    FilterPayload & { id_in?: number[] }
  >();
  const { networks = [] } = useStore((state) => state.auth.user);

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
        where = { id_in: [...networks, 999] };
        break;
      }
    }
    setFilters({ ...where });
  }, [filter, networks]);

  // TODO: add loader component
  const Loader = <div key='loader'>Loading ...</div>;

  return (
    <Wrapper>
      <ButtonFilter
        initialFilters={initialFilters}
        onChange={(key) => setFilter(key as Filter)}
      />
      {isEmpty(list) && !hasMore ? (
        <EmptyContainer
          description='Unfortunately, we did not find any matches for your request'
          explanation='Please change your filtering criteria to try again.'
        />
      ) : (
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
            <List
              link={Page.NETWORKS}
              // TODO: object is not correct type
              //@ts-ignore
              items={list}
              isMobile={isMobile}
              renderAction={(id) => <NetworkAction id={id} />}
            />
          </InfiniteScroll>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default NetworkList;
