import { useMemo, useEffect, useState, useCallback } from 'react';
import useFetch from 'hooks/useFetch';

import Event from '../config/types';
import { serializer } from '../store';
import { DEFAULT_PAGINATION } from 'config/constants';

export default function useFetchEvents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>,
  page = 0,
  isInitial = true,
): [boolean, Event[], boolean] {
  const [list, setList] = useState<Event[]>([]);

  const [
    { response: data, isLoading: isEventsLoading },
    doFetchEvents,
  ] = useFetch<Event[]>([]);
  const [
    { response: total, isLoading: isEventsCoutnLoading },
    doFetchEventsCount,
  ] = useFetch<number>(0);

  const isLoading = useMemo(() => isEventsLoading || isEventsCoutnLoading, [
    isEventsLoading,
    isEventsCoutnLoading,
  ]);

  const hasMore = useMemo(() => list!.length < total!, [list, total]);

  const loadEvents = useCallback(
    (page: number) => {
      if (hasMore && !isEventsLoading) {
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
    [hasMore, isEventsLoading],
  );

  useEffect(() => {
    if (isInitial && hasMore) {
      loadEvents(page);
    }
  }, [page, hasMore, isInitial]);

  useEffect(() => {
    setList(list.concat(data!));
  }, [data]);

  useEffect(() => {
    doFetchEventsCount(
      (api) => api.events.count(filters),
      (res) => res,
    );
  }, []);

  return [isLoading, list, hasMore];
}
