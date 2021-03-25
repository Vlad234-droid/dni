import { EntitySelectors } from '@reduxjs/toolkit';

const getDataOrReject = async <T, E, R>(
  getData: () => Promise<T>,
  rejectWithValue: (err: E) => R,
) => {
  try {
    return await getData();
  } catch (err) {
    return rejectWithValue(err);
  }
};

const DEFAULT_META = {
  count: 0,
  total: 0,
  unread: 0,
  page: 1,
  pageCount: 1,
};

const getEntitySelectors = <T, V>(
  es: EntitySelectors<T, V>,
): [(state: V) => T[], (state: V, id: string | number) => T | undefined] => {
  const { selectAll, selectById } = es;

  return [selectAll, selectById];
};

type FilterPayload = {
  // pagination
  _limit: number;
  _start: number;

  // filtering
  _where?: string;

  // sorting
  _sort?: 'created_at:desc' | 'created_at:asc';
};

export type { FilterPayload };

export { getDataOrReject, DEFAULT_META, getEntitySelectors };
