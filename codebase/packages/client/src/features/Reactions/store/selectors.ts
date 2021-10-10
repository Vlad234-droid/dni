import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { EntityAdapter, Reaction } from './types';

const reactionsSelectors = EntityAdapter.getSelectors((state: RootState) => state.reactions);

const [entitySelectors, entitySelector] = getEntitySelectors(reactionsSelectors);

export const listSelector = createSelector(entitySelectors, (reactions) => reactions);

export const byIdSelector = (id: Reaction['id']) =>
  createSelector(
    (state: RootState) => entitySelector(state, id),
    (reaction) => reaction,
  );
