import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import isEmpty from 'lodash.isempty';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { FilterPayload } from 'types/payload';
import { EmptyContainer, Spinner } from 'features/Common';
import { DEFAULT_PAGINATION } from 'config/constants';
import { useScrollContainer } from 'context/ScrollContainerContext';

import { Filter, ALL, BY_EVENT, BY_NETWORK } from '../../config/types';
import { getList, getCount, listSelector, clear } from '../../store';
import PostItem from '../PostItem';

type Props = {
  filter?: Filter;
  entityId?: number;
  isArchived?: boolean;
};

const PostList: FC<Props> = ({ entityId, filter = ALL, isArchived }) => {
  const dispatch = useDispatch();
  const scrollContainer = useScrollContainer();
  const {
    meta: { total },
    isLoading,
  } = useStore((state) => state.posts);
  const { networks, events } = useStore((state) => state.auth.user);
  const posts = useSelector(listSelector);
  const hasMore = useMemo(() => posts.length < total, [posts, total]);

  const [filters, setFilters] = useState<
    FilterPayload & {
      network_eq?: number;
      event_eq?: number;
      network_in?: number[];
      _publicationState?: string;
      archived?: boolean;
    }
  >();

  const loadPosts = useCallback(
    (page: number) => {
      const next = page * DEFAULT_PAGINATION._limit;
      if (filters && hasMore && !isLoading && next <= total) {
        dispatch(
          // @ts-ignore
          getList({
            _sort: 'created_at:desc',
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
    if (filters) {
      dispatch(getCount(filters));
      dispatch(clear());
    }
  }, [filters]);

  useEffect(() => {
    if (![BY_NETWORK, BY_EVENT].includes(filter)) {
      return;
    }

    let where;
    switch (filter) {
      case BY_EVENT: {
        where = { event_eq: entityId, archived: isArchived };
        break;
      }
      case BY_NETWORK: {
        where = { network_eq: entityId };
        break;
      }
    }
    setFilters({ ...filters, ...where });
  }, [filter, entityId, isArchived]);

  useEffect(() => {
    if (filter != ALL) {
      return;
    }

    setFilters({
      _publicationState: 'preview',
      _where: {
        _or: [
          { event_null: true, network_null: true }, // public posts
          { network_in: networks }, // posts for networks to which the user is subscribed
          { event_in: events }, // posts for events to which the user is subscribed
          { event_in: events, network_in: networks }, // posts for events and networks to which the user is subscribed
        ],
      },
    });
  }, [filter, events, networks]);

  return !isLoading && isEmpty(posts) && !hasMore ? (
    <EmptyContainer description='Unfortunately, we did not find any matches for your request' />
  ) : (
    <InfiniteScroll
      key={JSON.stringify(filters)} // unique key for unmount when switch filter
      loadMore={loadPosts}
      hasMore={!isLoading && hasMore}
      pageStart={-1}
      loader={<Spinner key={0} height='200px' />}
      threshold={0}
      getScrollParent={() => scrollContainer!.current}
      useWindow={false}
    >
      {posts.map((post) => {
        return <PostItem key={post.id} item={post} />;
      })}
    </InfiniteScroll>
  );
};

export default PostList;
