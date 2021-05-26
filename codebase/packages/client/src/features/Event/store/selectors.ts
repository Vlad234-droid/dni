import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { getEntitySelectors } from 'utils/storeHelper';

import { eventsAdapter } from './slice';
import serializer from './serializer';
import Event from '../config/types';

const eventsSelectors = eventsAdapter.getSelectors(
  (state: RootState) => state.events,
);

const [selectAll, selectById] = getEntitySelectors(eventsSelectors);

const byIdSelector = (id: Event['id']) =>
  createSelector(
    (state: RootState) => serializer(selectById(state, id)),
    (event) => event,
  );

const listSelector = createSelector(
  (state: RootState) => selectAll(state).map((event) => serializer(event)!),
  (events) => events,
);

export { byIdSelector, listSelector };
