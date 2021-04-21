import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { eventsAdapter } from './slice';
import { Event } from './types';

const eventsSelectors = eventsAdapter.getSelectors(
  (state: RootState) => state.events,
);

const [selectAll, selectById] = getEntitySelectors(eventsSelectors);

const byIdSelector = (id: Event['id']) =>
  createSelector(
    (state: RootState) => selectById(state, id),
    (network) => network,
  );

const listSelector = createSelector(selectAll, (events) => events);

export { byIdSelector, listSelector };
