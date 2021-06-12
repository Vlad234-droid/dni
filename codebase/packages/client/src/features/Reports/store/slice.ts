import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import keyBy from 'lodash.keyby';
import sort from 'lodash.filter';

import Loading from 'types/loading';

import * as T from '../config/types';
import * as A from './actionTypes';
import { getEntityState, reportsMiddleware, setDefaultGraphicsState, setGraphicsState } from '../utils';

const initialState: T.State = {
  entityType: T.Entity.NETWORK,
  [T.Entity.NETWORK]: getEntityState(),
  [T.Entity.EVENT]: getEntityState(),
  loading: Loading.IDLE,
  error: undefined,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReports = createAsyncThunk<any, any>(A.GET_REPORTS, reportsMiddleware);

const slice = createSlice({
  name: A.ROOT,
  initialState,
  reducers: {
    setEntityType(state, { payload: { entityType } }) {
      state.entityType = Number(entityType);
    },

    setFilter(state, { payload: { key } }) {
      state[state.entityType].filter = key;
    },

    setTimePeriodFilter(state, { payload: { period } }) {
      const { filter } = state[state.entityType];
      state[state.entityType][filter].filter = period;
    },

    updatePeriodInterval(state, { payload }) {
      const { entityType, value, prop } = payload as {
        entityType: T.Entity;
        value: T.DatePoint;
        prop: string;
      };

      const group = state[entityType][T.PERIOD][T.Period.PICK_PERIOD];

      group.dateInterval[prop] = value;
    },

    updateStatistics(state, { payload }) {
      const { entityType, filter, filterFilter, id, checked } = payload as {
        entityType: T.Entity;
        filter: T.Filter;
        filterFilter: T.Period;
        checked: boolean;
        id: string;
      };

      const group = state[entityType][filter][filterFilter];

      group.statistics = group.statistics.map((item: T.StatisticsItem) =>
        item.id === id ? { ...item, checked } : item,
      );

      group.chart = {
        ...group.chart,
        elements: keyBy(sort(group.statistics, ['checked', true]), (o) => o.name),
      };
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: T.State) => {
      state.loading = Loading.PENDING;
      state.error = undefined;
    };

    const setSucceeded = (state: T.State) => {
      state.loading = Loading.SUCCEEDED;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setFailed = (state: T.State, payload: any) => {
      state.loading = Loading.FAILED;
      state.error = payload.error.message;
    };

    builder
      .addCase(getReports.pending, setPending)
      .addCase(getReports.fulfilled, (state: T.State, { payload }) => {
        const { entityType, filter, filterFilter, data, metadata } = payload as T.FulfilledArgs;

        const group = state[entityType][filter][filterFilter];

        if ([data, metadata].includes(null)) {
          setDefaultGraphicsState({ group });
        } else {
          setGraphicsState({ group, data, metadata });
        }

        setSucceeded(state);
        console.table({
          data,
          metadata,
        });
      })
      .addCase(getReports.rejected, setFailed)
      .addDefaultCase((state) => state);
  },
});

export const { actions } = slice;

export { getReports };

export default slice.reducer;
