import { createSelector } from '@reduxjs/toolkit';
import find from 'lodash.find';
import flatten from 'lodash.flatten';

const selectSelf = (state) => state.auth;

const selectReactions = createSelector(selectSelf, (state) => state.reactions);

// TODO: fix types
const selectReactionPerEntity = (id) => createSelector(selectReactions, (reactions) =>
  reactions && find(flatten(Object.values(reactions)) as any, (value: any) => value.parent.id === id));

export { selectReactions, selectReactionPerEntity };