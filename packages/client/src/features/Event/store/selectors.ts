import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { EntityAdapter, Event } from './types';

const eventsSelectors = EntityAdapter.getSelectors(
  (state: RootState) => state.events,
);

const [entitySelectors, entitySelector] = getEntitySelectors(eventsSelectors);

const byIdSelector = createSelector(
  (state: RootState, id: Event['id']) => entitySelector(state, id),
  (network) => network,
);

const listSelector = createSelector(entitySelectors, (events) => events);

export { byIdSelector, listSelector };
