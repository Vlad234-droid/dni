import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { FilterPayload, DEFAULT_PAGINATION } from 'utils/storeHelper';
import { useScrollContainer } from 'context/ScrollContainerContext';
import { Filter } from '../../config/types';
import { getList, getCount, listSelector, clear } from '../../store';
import PostItem from '../PostItem';

type Props = {
  filter?: Filter;
};

const PostList: FC<Props> = ({ filter }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<FilterPayload>();

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
        
        break;
      }
      case 'BY_NETWORK': {
        
        break;
      }
    }
    setFilters({ ...filters, _where: JSON.stringify(where) });
  }, [filter]);

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
        return (
          <PostItem
            key={post.id}
            item={post}
          />
        );
      })}
    </InfiniteScroll>
  );
};

export default PostList;
