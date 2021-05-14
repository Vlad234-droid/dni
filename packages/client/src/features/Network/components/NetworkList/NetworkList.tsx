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
import { EmptyContainer, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import { Loading } from 'store/types';
import { RootState } from 'store/rootReducer';

import { Filter, ALL, YOUR_NETWORKS } from '../../config/types';
import {
  getList,
  getCount,
  listSelector,
  clear,
  getParticipants,
} from '../../store';
import { Wrapper, ListContainer } from './styled';
import NetworkAction from '../NetworkAction';

const TEST_ID = 'networks-list';

const initialFilters = [
  {
    key: YOUR_NETWORKS,
    title: 'Your networks',
    active: true,
  },
  {
    key: ALL,
    title: 'All',
    active: false,
  },
];

const NetworkList: FC = () => {
  const dispatch = useDispatch();
  const { networks } = useStore((state) => state.auth.user);
  const [filter, setFilter] = useState<Filter>(YOUR_NETWORKS);
  const [filters, setFilters] = useState<
    FilterPayload & { id_in?: number[] }
  >();

  const scrollContainer = useScrollContainer();

  const {
    participants,
    meta: { total },
    loading,
  } = useStore((state) => state.networks);
  const list = useSelector((state: RootState) => listSelector(state, filters));
  const hasMore = useMemo(() => list.length < total, [list, total]);

  const isLoading = useMemo(() => loading === Loading.PENDING, [loading]);

  const loadNetworks = useCallback(
    (page: number) => {
      const next = page * DEFAULT_PAGINATION._limit;
      if (filters && hasMore && !isLoading && next <= total) {
        dispatch(
          getList({
            ...filters,
            ...DEFAULT_PAGINATION,
            _start: next,
          }),
        );
      }
    },
    [filters, hasMore, isLoading, total],
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
    if (filter == YOUR_NETWORKS) {
      setFilters({ id_in: [...(networks || []), -1] });
    }

    if (filter == ALL) {
      setFilters({});
    }
  }, [filter, networks]);

  useEffect(() => {
    dispatch(getParticipants());
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
    <Wrapper data-testid={TEST_ID}>
      <ButtonFilter
        initialFilters={initialFilters}
        onChange={(key) => setFilter(key as Filter)}
      />
      {isLoading && <Spinner />}
      {loading == Loading.SUCCEEDED && isEmpty(list) && !hasMore ? (
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
            loader={<Spinner key={0} height='200px' />}
            threshold={0}
            getScrollParent={() => scrollContainer!.current}
            useWindow={false}
          >
            <List
              link={Page.NETWORKS}
              //@ts-ignore
              items={list}
              participants={participants}
              renderAction={(id) => <NetworkAction id={id} />}
            />
          </InfiniteScroll>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default NetworkList;
