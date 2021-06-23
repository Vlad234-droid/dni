import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import keyBy from 'lodash.keyby';
import sort from 'lodash.filter';

import Loading from 'types/loading';

import * as T from '../config/types';
import * as A from './actionTypes';
import {
  getEntityState,
  reportsByTimeMiddleware,
  reportsByRegionMiddleware,
  reportsByFormatMiddleware,
} from '../utils';

const initialState: T.State = {
  entityType: T.Entity.NETWORK,
  [T.Entity.NETWORK]: getEntityState(),
  [T.Entity.EVENT]: getEntityState(),
  loading: Loading.IDLE,
  error: undefined,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReportsByTime = createAsyncThunk<any, any>(A.GET_REPORTS_BY_TIME, reportsByTimeMiddleware);
const getReportsByRegion = createAsyncThunk<any, any>(A.GET_REPORTS_BY_REGION, reportsByRegionMiddleware);
const getReportsByFormat = createAsyncThunk<any, any>(A.GET_REPORTS_BY_FORMAT, reportsByFormatMiddleware);

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

      if (group.counter === 5 && checked === true) {
        return;
      }

      group.statistics = group.statistics.map((item: T.StatisticsItem) => {
        if (item.entityId != id) {
          return item;
        }

        let color;

        if (checked === true) {
          color = Object.keys(group.color).find((key) => {
            if (group.color[key] === false) {
              group.color[key] = true;
              group.counter += 1;

              return true;
            }

            return false;
          });
        }

        if (checked === false) {
          group.color[item.color] = false;
          group.counter -= 1;
        }

        return { ...item, checked, color };
      });

      group.chart.elements = keyBy(sort(group.statistics, ['checked', true]), (o: Partial<{ name: string }>) => o.name);
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

    const setFailed = (state: T.State, payload: any) => {
      state.loading = Loading.FAILED;
      state.error = payload.error.message;
    };

    builder
      .addCase(getReportsByTime.pending, setPending)
      .addCase(getReportsByTime.fulfilled, (state: T.State, { payload }) => {
        const { entityType, filter, filterFilter, data } = payload as T.FulfilledArgs;

        state[entityType][filter][filterFilter] = data;

        setSucceeded(state);
      })
      .addCase(getReportsByTime.rejected, setFailed)

      .addCase(getReportsByRegion.pending, setPending)
      .addCase(getReportsByRegion.fulfilled, (state: T.State, { payload }) => {
        setSucceeded(state);
      })
      .addCase(getReportsByRegion.rejected, setFailed)

      .addCase(getReportsByFormat.pending, setPending)
      .addCase(getReportsByFormat.fulfilled, (state: T.State, { payload }) => {
        setSucceeded(state);
      })
      .addCase(getReportsByFormat.rejected, setFailed)

      .addDefaultCase((state) => state);
  },
});

export const { actions } = slice;

export { getReportsByTime, getReportsByRegion, getReportsByFormat };

export default slice.reducer;
