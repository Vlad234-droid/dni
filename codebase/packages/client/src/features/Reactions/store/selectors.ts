import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { Reaction } from '../config/types';
import { EntityAdapter } from './types';

const reactionsSelectors = EntityAdapter.getSelectors(
  (state: RootState) => state.reactions,
);

const [entitySelectors, entitySelector] = getEntitySelectors(reactionsSelectors);

const byIdSelector = (id: Reaction['id']) =>
  createSelector(
    (state: RootState) => entitySelector(state, id),
    (post) => post,
  );

const listSelector = createSelector(entitySelectors, (posts) => posts);

export { byIdSelector, listSelector };
