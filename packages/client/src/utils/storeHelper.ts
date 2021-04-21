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

// TODO: #its a constant - not util
const DEFAULT_META = {
  count: 0,
  total: 0,
  unread: 0,
  page: 1,
  pageCount: 1,
};

// TODO: #why this transformation in need?
const getEntitySelectors = <T, V>(
  entitySelectors: EntitySelectors<T, V>,
): [(state: V) => T[], (state: V, id: string | number) => T | undefined] => {
  const { selectAll, selectById } = entitySelectors;

  return [selectAll, selectById];
};

// TODO: #its a type - not util
type PaginationPayload = {
  _limit: number;
  _start: number;
};

// TODO: #its a constant - not util
const DEFAULT_PAGINATION: PaginationPayload = {
  _start: 0,
  _limit: 10,
};

// TODO: #its a type - not util
type FilterPayload = {
  // filtering
  _where?: object;

  // sorting
  _sort?: 'created_at:desc' | 'created_at:asc';
};

export type { FilterPayload, PaginationPayload };

export {
  getDataOrReject,
  DEFAULT_META,
  getEntitySelectors,
  DEFAULT_PAGINATION,
};
