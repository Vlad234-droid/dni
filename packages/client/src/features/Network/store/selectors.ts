import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { networksAdapter } from './slice';
import serializer from './serializer';
import { Network, Filters } from '../config/types';

const networksSelectors = networksAdapter.getSelectors(
  (state: RootState) => state.networks,
);
const [selectAll, selectById] = getEntitySelectors(networksSelectors);

const byIdSelector = (id: Network['id']) =>
  createSelector(
    (state: RootState) => serializer(selectById(state, id)),
    (network) => network,
  );

const listSelector = createSelector(
  (state: RootState, filters: Filters | undefined) =>
    selectAll(state)
      .map((network) => serializer(network)!)
      .filter((item) => {
        if (!filters?.id_in) return true;

        return filters.id_in.includes(item.id);
      }),
  (networks) => networks,
);

export { byIdSelector, listSelector };
