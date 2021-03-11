import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { EntityAdapter, Network } from './types';

const networksSelectors = EntityAdapter.getSelectors(
  (state: RootState) => state.networks,
);

const [entitySelectors, entitySelector] = getEntitySelectors(networksSelectors);

const byIdSelector = createSelector(
  (state: RootState, id: Network['id']) => entitySelector(state, id),
  (network) => network,
);

const listSelector = createSelector(entitySelectors, (networks) => networks);

export { byIdSelector, listSelector };
