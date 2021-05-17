import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
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
import Loading from 'types/loading';
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
  const networksList = useSelector((state: RootState) =>
    listSelector(state, filters),
  );
  const hasMore = useMemo(() => networksList.length < total, [
    networksList,
    total,
  ]);
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );

  const loadNetworks = useCallback(
    (page: number) => {
      const next = page * DEFAULT_PAGINATION._limit;
      if (filters && hasMore && next <= total) {
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

  if (loading === Loading.FAILED) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <div>Here some error</div>
      </Wrapper>
    );
  }

  // TODO: handle case, when filter is changed before data is loaded

  return (
    <Wrapper data-testid={TEST_ID}>
      <ButtonFilter
        initialFilters={initialFilters}
        onChange={(key) => setFilter(key as Filter)}
      />
      {isEmpty(networksList) && isLoading && <Spinner height='500px' />}
      {loading == Loading.SUCCEEDED && isEmpty(networksList) && !hasMore ? (
        <EmptyContainer
          description='Unfortunately, we did not find any matches for your request'
          explanation='Please change your filtering criteria to try again.'
        />
      ) : (
        <ListContainer>
          <InfiniteScroll
            key={filter} // unique key for unmount when switch filter
            loadMore={loadNetworks}
            hasMore={hasMore}
            pageStart={-1}
            threshold={0}
            getScrollParent={() => scrollContainer!.current}
            useWindow={false}
          >
            <List
              link={Page.NETWORKS}
              //@ts-ignore
              items={networksList}
              participants={participants}
              renderAction={(id) => <NetworkAction id={id} />}
            />
          </InfiniteScroll>
          {!isEmpty(networksList) && isLoading && <Spinner />}
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default NetworkList;
