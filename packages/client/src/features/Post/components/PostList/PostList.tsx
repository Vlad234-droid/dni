import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import isEmpty from 'lodash.isempty';
import Omit from 'lodash.omit';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { FilterPayload } from 'types/payload';
import { EmptyContainer, Error, Spinner } from 'features/Common';
import { DEFAULT_PAGINATION } from 'config/constants';
import { useScrollContainer } from 'context/ScrollContainerContext';
import Loading from 'types/loading';
import ButtonFilter from 'features/ButtonFilter';

import { Filter } from '../../config/types';
import { ALL, ARCHIVED } from '../../config/constants';
import { getList, getCount, listSelector, clear } from '../../store';
import { getAllFilterPayload, getFilterPayload } from '../../utils';
import PostItem from '../PostItem';
import { FiltersContainer } from './styled';

type Props = {
  filter?: Filter;
  entityId?: number;
};

const byEventFilters = [
  {
    key: ALL,
    title: 'All Posts',
    active: true,
  },
  {
    key: ARCHIVED,
    title: 'Archived',
    active: false,
  },
];

type Filters = FilterPayload & {
  network_eq?: number;
  event_eq?: number;
  network_in?: number[];
  _publicationState?: string;
  archived?: boolean;
};
type ByEntityFilter = typeof ALL | typeof ARCHIVED;

const PostList: FC<Props> = ({ entityId, filter = ALL }) => {
  const dispatch = useDispatch();
  const scrollContainer = useScrollContainer();
  const {
    meta: { total, error: countError },
    loading,
    error: listError,
  } = useStore((state) => state.posts);
  const { networks, events } = useStore((state) => state.auth.user);
  const posts = useSelector(listSelector);
  const hasMore = useMemo(() => posts.length < total, [posts, total]);
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );
  const error = useMemo(() => listError || countError, [listError, countError]);
  const [byEntityFilter, setByEntityFilter] = useState<ByEntityFilter>(ALL);
  const [filters, setFilters] = useState<Filters>(
    filter == ALL
      ? getAllFilterPayload(networks, events)
      : getFilterPayload(filter, entityId),
  );

  const loadPosts = useCallback(
    (filters: Filters) => {
      dispatch(
        getList({
          _sort: 'created_at:desc',
          ...filters,
          ...DEFAULT_PAGINATION,
          _start: 0,
        }),
      );
    },
    [filters],
  );

  const loadMorePosts = useCallback(
    (page: number) => {
      const next = page * DEFAULT_PAGINATION._limit;

      if (!(loading === Loading.PENDING) && hasMore && next <= total) {
        dispatch(
          getList({
            _sort: 'created_at:desc',
            ...filters,
            ...DEFAULT_PAGINATION,
            _start: next,
          }),
        );
      }
    },
    [filters, hasMore, loading, total],
  );

  const handleByEventFilterChange = useCallback(
    (filter: ByEntityFilter) => {
      let updatedFilters;

      switch (filter) {
        case ARCHIVED: {
          updatedFilters = { ...filters, archived: true };
          break;
        }
        case ALL: {
          updatedFilters = Omit({ ...filters }, ['archived']);
          break;
        }
      }

      loadPosts(updatedFilters);
      setFilters(updatedFilters);
      setByEntityFilter(filter);
    },
    [filters],
  );

  useEffect(() => {
    (async () => {
      await dispatch(clear());
      await dispatch(getCount(filters));
    })();
  }, [filters]);

  useEffect(() => {
    loadPosts(filters);
  }, []);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: error }} fullWidth />;

    if (isEmpty(posts) && isLoading) return <Spinner height='500px' />;

    if (loading == Loading.SUCCEEDED && isEmpty(posts))
      return (
        <EmptyContainer description='Unfortunately, we did not find any matches for your request' />
      );

    return (
      <>
        <InfiniteScroll
          initialLoad={false}
          key={`${filter}-${byEntityFilter}`} // unique key for unmount when switch filter
          loadMore={loadMorePosts}
          hasMore={hasMore && !(loading === Loading.PENDING)}
          threshold={100}
          getScrollParent={() => scrollContainer!.current}
          useWindow={false}
        >
          {posts.map((post) => (
            <PostItem key={post.id} item={post} />
          ))}
        </InfiniteScroll>
      </>
    );
  }, [error, posts, loading, total]);

  return (
    <>
      {filter !== ALL && (
        <FiltersContainer>
          <ButtonFilter
            initialFilters={byEventFilters}
            onChange={(key) => handleByEventFilterChange(key as ByEntityFilter)}
          />
        </FiltersContainer>
      )}
      {memoizedContent}
    </>
  );
};

export default PostList;
