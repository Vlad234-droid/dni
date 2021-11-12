import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import flatten from 'lodash.flatten';

import API from 'utils/api';

import { Reaction } from '../config/types';
import * as T from './types';

const initialState: T.State = T.EntityAdapter.getInitialState({
  error: undefined,
});

const getReactions = createAsyncThunk<T.ReactionsResponse, T.ReactionsPayload>(
  T.GET_REACTIONS_ACTION,
  async (filters) => await API.reactions.getReactions<T.ReactionsResponse>(filters),
);

const addReaction = createAsyncThunk<T.AddReactionResponse, T.AddReactionPayload>(
  T.ADD_REACTION,
  async (filters) => await API.reactions.addReaction<T.AddReactionResponse>(filters),
);

const deleteReaction = createAsyncThunk<T.DeleteReactionResponse, T.DeleteReactionPayload>(
  T.DELETE_REACTION,
  async (filters) => await API.reactions.deleteReaction<T.DeleteReactionResponse>(filters),
);


const slice = createSlice({
  name: T.ROOT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setFailed = (state: T.State, payload: any) => {
      state.error = payload.error.message;
    };

    builder
      .addCase(getReactions.fulfilled, (state: T.State, { payload }) => {
        if (payload) {
          const reactions = flatten(Object.values(payload)).reduce((res: Reaction[], current: Partial<Reaction>) => {
            const reaction = {
              ...current,
              id: current!.parent!.relatedId,
              reactionId: current.id,
            };

            res.push(reaction as Reaction);
            return res;
          }, []);
          T.EntityAdapter.upsertMany(state, reactions);
        }
      })
      .addCase(getReactions.rejected, setFailed)
      .addCase(addReaction.fulfilled, (state: T.State, { payload }) => {
        const reaction = {
          ...payload,
          id: payload.parent.relatedId,
          reactionId: payload.id,
        };

        T.EntityAdapter.upsertOne(state, reaction);
      })
      .addCase(addReaction.rejected, setFailed)
      .addCase(deleteReaction.fulfilled, (state: T.State, { meta: { arg: { entityId }} }) => {
        T.EntityAdapter.removeOne(state, entityId);
      })
      .addCase(deleteReaction.rejected, setFailed);
  },
});

export { getReactions, addReaction, deleteReaction };

export default slice.reducer;
