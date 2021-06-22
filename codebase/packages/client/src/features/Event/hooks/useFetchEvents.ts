import { useCallback, useEffect, useMemo, useState } from 'react';

import useFetch from 'hooks/useFetch';
import Loading from 'types/loading';

import Event from '../config/types';
import { serializer } from '../store';

export default function useFetchEvents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>,
  page = 0,
  isInitial = true,
): [Loading, Event[], boolean, string?, string?] {
  const [list, setList] = useState<Event[]>([]);

  const [{ response: data, loading, error: listError }, doFetchEvents, setLoading] = useFetch<Event[]>([]);
  const [{ response: total, loading: countLoading, error: countError }, doFetchEventsCount] = useFetch<number>(0);

  const hasMore = useMemo(() => list!.length < total!, [list, total]);

  const loadEvents = useCallback(
    (page: number) => {
      if (hasMore && loading !== Loading.PENDING) {
        doFetchEvents(
          (api) =>
            api.events.fetchAll({
              ...filters,
              _start: filters._limit ? page * filters._limit : 0,
            }),
          (res) => res.map((i) => serializer(i)!),
        );
      }
    },
    [hasMore, loading],
  );

  useEffect(() => {
    if (isInitial && hasMore) {
      loadEvents(page);
    }
  }, [page, total, isInitial]);

  useEffect(() => {
    // if total === 0 request is not performed --> set succeeded to display empty container
    if (countLoading == Loading.SUCCEEDED && total === 0) {
      setLoading(Loading.SUCCEEDED);
    }
  }, [total, countLoading]);

  useEffect(() => {
    setList(list.concat(data!));
  }, [data]);

  useEffect(() => {
    doFetchEventsCount(
      (api) => api.events.count(filters),
      (res) => res,
    );
  }, []);

  return [loading, list, hasMore, listError, countError];
}
