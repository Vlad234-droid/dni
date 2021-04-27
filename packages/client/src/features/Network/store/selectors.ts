import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { networksAdapter } from './slice';
import { Network } from '../config/types';

const networksSelectors = networksAdapter.getSelectors(
  (state: RootState) => state.networks,
);
const [selectAll, selectById] = getEntitySelectors(networksSelectors);

const byIdSelector = (id: Network['id']) =>
  createSelector(
    (state: RootState) => selectById(state, id),
    (network) => network,
  );

const listSelector = createSelector(selectAll, (networks) => networks);

export { byIdSelector, listSelector };
