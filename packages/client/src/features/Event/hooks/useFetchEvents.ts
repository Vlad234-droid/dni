import { useCallback, useEffect, useMemo, useState } from 'react';

import useFetch from 'hooks/useFetch';
import { DEFAULT_PAGINATION } from 'config/constants';
import Loading from 'types/loading';

import Event from '../config/types';
import { serializer } from '../store';

export default function useFetchEvents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>,
  page = 0,
  isInitial = true,
): [Loading, Event[], boolean] {
  const [list, setList] = useState<Event[]>([]);

  const [{ response: data, loading: eventsLoading }, doFetchEvents] = useFetch<
    Event[]
  >([]);
  const [
    { response: total, loading: countLoading },
    doFetchEventsCount,
  ] = useFetch<number>(0);
  const [loading, setLoading] = useState<Loading>(eventsLoading);

  const hasMore = useMemo(() => list!.length < total!, [list, total]);

  const loadEvents = useCallback(
    (page: number) => {
      if (hasMore && loading !== Loading.PENDING) {
        doFetchEvents(
          (api) =>
            api.events.fetchAll({
              ...filters,
              ...DEFAULT_PAGINATION,
              _start: page * DEFAULT_PAGINATION._limit,
            }),
          (res) => res.map((i) => serializer(i)!),
        );
      }
    },
    [hasMore, loading],
  );

  useEffect(() => {
    // when count is 0 load events is not not called - set loading to SUCCEEDED
    if (countLoading == Loading.SUCCEEDED && !hasMore) {
      setLoading(countLoading);
    }

    if (isInitial && hasMore) {
      loadEvents(page);
    }
  }, [page, hasMore, isInitial, countLoading]);

  useEffect(() => {
    setList(list.concat(data!));
  }, [data]);

  useEffect(() => {
    doFetchEventsCount(
      (api) => api.events.count(filters),
      (res) => res,
    );
  }, []);

  return [loading, list, hasMore];
}
