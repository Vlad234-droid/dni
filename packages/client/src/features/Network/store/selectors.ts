import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { networksAdapter } from './slice';
import serializer from './serializer';
import { Network } from '../config/types';

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
  (state: RootState, networks: number[] | undefined) =>
    selectAll(state)
      .filter((item) => {
        if (!networks) return item;

        return networks.includes(item.id);
      })
      .map((network) => serializer(network)!),
  (networks) => networks,
);

export { byIdSelector, listSelector };
