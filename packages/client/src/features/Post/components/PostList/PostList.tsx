import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { FilterPayload } from 'types/payload';
import { DEFAULT_PAGINATION } from 'config/constants';
import { useScrollContainer } from 'context/ScrollContainerContext';
import { Filter } from '../../config/types';
import { getList, getCount, listSelector, clear } from '../../store';
import PostItem from '../PostItem';

type Props = {
  filter?: Filter;
  entityId?: number;
};

const PostList: FC<Props> = ({ filter, entityId }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<
    FilterPayload & {
      network_eq?: number;
      event_eq?: number;
    }
  >({ _sort: 'created_at:desc' });

  const scrollContainer = useScrollContainer();

  const {
    meta: { total },
    isLoading,
  } = useStore((state) => state.posts);
  const posts = useSelector(listSelector);
  const hasMore = useMemo(() => posts.length < total, [posts, total]);

  const loadPosts = useCallback(
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
        dispatch(clear());
        dispatch(getCount(filters));
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
      case 'BY_EVENT': {
        where = { event_eq: entityId };
        break;
      }
      case 'BY_NETWORK': {
        where = { network_eq: entityId };
        break;
      }
    }
    setFilters({ ...filters, ...where });
  }, [filter, entityId]);

  // TODO: add loader component
  const Loader = <div key='loader'>Loading ...</div>;

  return (
    <InfiniteScroll
      key={filter} // unique key for unmount when switch filter
      loadMore={loadPosts}
      hasMore={!isLoading && hasMore}
      pageStart={-1}
      loader={Loader}
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
