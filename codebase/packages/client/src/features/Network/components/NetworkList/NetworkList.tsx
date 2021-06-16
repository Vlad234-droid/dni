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
import { EmptyContainer, Error, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';
import { RootState } from 'store/rootReducer';
import Participants from 'features/Participants';
import { CanPerform } from 'features/Auth';
import { Action, buildAction, Component } from 'features/Action';

import { Filter } from '../../config/types';
import { initialListFilters, ALL, YOUR_NETWORKS } from '../../config/filters';
import { getList, getCount, listSelector, clear, getParticipants } from '../../store';
import NetworkAction from '../NetworkAction';
import { Wrapper, ListContainer, ParticipantsWrapper } from './styled';

const TEST_ID = 'networks-list';

type Filters = FilterPayload & { id_in?: number[] };

const NetworkList: FC = () => {
  const dispatch = useDispatch();
  const { networks } = useStore((state) => state.auth.user);
  const [filter, setFilter] = useState<Filter>(YOUR_NETWORKS);
  const [filters, setFilters] = useState<Filters>({
    id_in: [...(networks || []), -1],
  });

  const scrollContainer = useScrollContainer();

  const {
    participants,
    meta: { total, error: countError },
    loading,
    error: listError,
  } = useStore((state) => state.networks);
  const networksList = useSelector((state: RootState) => listSelector(state, filter === ALL ? undefined : networks));
  const hasMore = useMemo(() => networksList.length < total, [networksList, total]);
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);
  const error = useMemo(() => listError || countError, [listError, countError]);

  const loadNetworks = useCallback(
    (filters: Filters) => {
      dispatch(
        getList({
          ...filters,
          ...DEFAULT_PAGINATION,
          _start: 0,
        }),
      );
    },
    [filters],
  );

  const loadMoreNetworks = useCallback(
    (page: number) => {
      const next = page * DEFAULT_PAGINATION._limit;
      if (!(loading === Loading.PENDING) && filters && hasMore && next <= total) {
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

  const handleFilterChange = useCallback(
    (filter: Filter) => {
      let filters;

      switch (filter) {
        case YOUR_NETWORKS: {
          filters = { id_in: [...(networks || []), -1] };
          break;
        }
        case ALL: {
          filters = {};
          break;
        }
      }

      loadNetworks(filters);
      setFilters(filters);
      setFilter(filter);
    },
    [networks],
  );

  // initial load
  useEffect(() => {
    loadNetworks(filters);
    dispatch(getParticipants());
  }, []);

  // TODO: move to handleFilterChange?
  useEffect(() => {
    (async () => {
      await dispatch(clear());
      await dispatch(getCount(filters));
    })();
  }, [filters]);

  // load on networks change, if filtered by your networks
  useEffect(() => {
    if (filter !== ALL) {
      const filters = {
        id_in: [...(networks || []), -1],
      };

      //@ts-ignore
      dispatch(getCount(filters));
      loadNetworks(filters);
    }
  }, [networks]);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: error }} />;

    if (isEmpty(networksList) && isLoading) return <Spinner height='500px' />;

    if (loading == Loading.SUCCEEDED && isEmpty(networksList)) {
      return <EmptyContainer description='Nothing to show' />;
    }

    return (
      <ListContainer>
        <InfiniteScroll
          initialLoad={false}
          key={filter} // unique key for unmount when switch filter
          loadMore={loadMoreNetworks}
          hasMore={!(loading === Loading.PENDING) && hasMore}
          threshold={100}
          getScrollParent={() => scrollContainer!.current}
          useWindow={false}
        >
          <List
            link={Page.NETWORKS}
            //@ts-ignore
            items={networksList}
            renderAction={(id) => <NetworkAction id={id} />}
            renderParticipants={(id) => (
              <CanPerform
                perform={buildAction(Component.NETWORK_PARTICIPANTS, Action.LIST)}
                yes={() => (
                  <ParticipantsWrapper>
                    <Participants participants={participants!.data[id]} />
                  </ParticipantsWrapper>
                )}
              />
            )}
          />
        </InfiniteScroll>
      </ListContainer>
    );
  }, [error, loading, networksList]);

  return (
    <Wrapper data-testid={TEST_ID}>
      <ButtonFilter
        initialFilters={initialListFilters}
        onChange={(key) => handleFilterChange(key as Filter)}
        name='networkList'
      />
      {memoizedContent}
    </Wrapper>
  );
};

export default NetworkList;