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

// TODO: #why this transformation in need?
const getEntitySelectors = <T, V>(
  entitySelectors: EntitySelectors<T, V>,
): [(state: V) => T[], (state: V, id: string | number) => T | undefined] => {
  const { selectAll, selectById } = entitySelectors;

  return [selectAll, selectById];
};

export { getDataOrReject, getEntitySelectors };
