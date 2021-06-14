import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { EntityAdapter, Post } from './types';

const networksSelectors = EntityAdapter.getSelectors(
  (state: RootState) => state.posts,
);

const [entitySelectors, entitySelector] = getEntitySelectors(networksSelectors);

const byIdSelector = (id: Post['id']) =>
  createSelector(
    (state: RootState) => entitySelector(state, id),
    (post) => post,
  );

const listSelector = createSelector(entitySelectors, (posts) => posts);

export { byIdSelector, listSelector };
