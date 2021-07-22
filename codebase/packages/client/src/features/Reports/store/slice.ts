import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import keyBy from 'lodash.keyby';
import sort from 'lodash.filter';

import Loading from 'types/loading';
import { getList as getNetworks, networksAdapter } from 'features/Network';
import { getList as getEvents, eventsAdapter } from 'features/Event';

import * as T from '../config/types';
import * as A from './actionTypes';
import {
  getGroupByPeriodState,
  getGroupByRegionState,
  getGroupByFormatState,
  reportsByTimeMiddleware,
  reportsByRegionMiddleware,
  reportsByFormatMiddleware,
} from '../utils';

const initialState: T.State = {
  filters: {
    reportType: T.ReportType.PERIOD,
    entityType: T.EntityType.NETWORK,
    periodType: T.PeriodType.THIS_YEAR,
  },
  groups: {
    [T.ReportType.PERIOD]: getGroupByPeriodState(),
    [T.ReportType.REGION]: getGroupByRegionState(),
    [T.ReportType.FORMAT]: getGroupByFormatState(),

    [T.EntityType.NETWORK]: [],
    [T.EntityType.EVENT]: [],
  },

  loading: Loading.IDLE,
  error: undefined,

  [T.EntityType.NETWORK]: {
    ids: [],
    entities: {},
  },

  [T.EntityType.EVENT]: {
    ids: [],
    entities: {},
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReportsByTime = createAsyncThunk(A.GET_REPORTS_BY_TIME, reportsByTimeMiddleware);
const getReportsByRegion = createAsyncThunk(A.GET_REPORTS_BY_REGION, reportsByRegionMiddleware);
const getReportsByFormat = createAsyncThunk(A.GET_REPORTS_BY_FORMAT, reportsByFormatMiddleware);

const slice = createSlice({
  name: A.ROOT,
  initialState,
  reducers: {
    setReportType(state, { payload: { key } }) {
      state.filters.reportType = key as T.ReportType;
    },

    setEntityType(state, { payload: { key } }) {
      state.filters.entityType = key as T.EntityType;
    },

    setPeriodType(state, { payload: { key } }) {
      state.filters.periodType = key as T.PeriodType;
    },

    updatePeriodInterval(state, { payload }) {
      const { prop, value, reportType } = payload as {
        prop: T.Prop;
        value: T.DatePoint;
        reportType: T.ReportType;
      };

      const groupByReportType = state.groups[reportType] as T.Group;

      groupByReportType.dateInterval[prop] = value;
    },

    updateStatistics(state, { payload }) {
      const { id, checked, reportType } = payload as {
        checked: boolean;
        id: string;
        reportType: T.ReportType;
      };

      const group = state.groups[reportType] as T.Group;

      if (group.counter === 5 && checked === true) {
        return;
      }

      group.statistics = group.statistics.map((item) => {
        if (item.entityId != id) {
          return item;
        }

        let color = '';

        if (checked === true) {
          color =
            Object.keys(group.color).find((key) => {
              if (group.color[key] === false) {
                group.color[key] = true;
                group.counter += 1;

                return true;
              }

              return false;
            }) || color;
        }

        if (checked === false) {
          group.color[item.color || color] = false;
          group.counter -= 1;
        }

        return { ...item, checked, color };
      });

      if (reportType === T.ReportType.PERIOD) {
        group.chart.elements = keyBy(
          sort(group.statistics, ['checked', true]),
          (o: Partial<{ name: string }>) => o.name,
        );
      }

      if (reportType === T.ReportType.REGION) {
        group.chart.elements = [];

        group.chart.entities = sort(group.statistics, ['checked', true]);

        const items = new Map();

        group.chart.entities.forEach(({ entityName, elements }: T.StatisticsItemByRegion) => {
          elements.forEach(({ regionName, count }) => {
            const itemName = regionName;
            const item = items.get(itemName);

            items.set(itemName, {
              ...(item ? item : {}),
              name: itemName,
              [entityName]: count,
            });
          });
        });

        items.forEach((element) => {
          group.chart.elements.push(element);
        });
      }

      if (reportType === T.ReportType.FORMAT) {
        group.chart.elements = [];

        group.chart.entities = sort(group.statistics, ['checked', true]);

        const items = new Map();

        group.chart.entities.forEach(({ entityName, elements }: T.StatisticsItemByFormat) => {
          elements.forEach(({ department, count }) => {
            const itemName = department;
            const item = items.get(itemName);

            items.set(itemName, {
              ...(item ? item : {}),
              name: itemName,
              [entityName]: count,
            });
          });
        });

        items.forEach((element) => {
          group.chart.elements.push(element);
        });
      }
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
        const { data } = payload as {
          data: T.GroupByPeriod;
        };

        state.groups[T.ReportType.PERIOD] = data;

        setSucceeded(state);
      })
      .addCase(getReportsByTime.rejected, setFailed)

      .addCase(getReportsByRegion.pending, setPending)
      .addCase(getReportsByRegion.fulfilled, (state: T.State, { payload }) => {
        const { data } = payload as {
          data: T.GroupByRegion;
        };

        state.groups[T.ReportType.REGION] = data;

        setSucceeded(state);
      })
      .addCase(getReportsByRegion.rejected, setFailed)

      .addCase(getReportsByFormat.pending, setPending)
      .addCase(getReportsByFormat.fulfilled, (state: T.State, { payload }) => {
        const { data } = payload as {
          data: T.GroupByFormat;
        };

        state.groups[T.ReportType.FORMAT] = data;

        setSucceeded(state);
      })
      .addCase(getReportsByFormat.rejected, setFailed)

      .addCase(getNetworks.fulfilled, (state: T.State, { payload }) => {
        networksAdapter.upsertMany(state[T.EntityType.NETWORK], payload);

        setSucceeded(state);
      })

      .addCase(getEvents.fulfilled, (state: T.State, { payload }) => {
        eventsAdapter.upsertMany(state[T.EntityType.EVENT], payload);

        setSucceeded(state);
      })

      .addDefaultCase((state) => state);
  },
});

export const { actions } = slice;

export { getReportsByTime, getReportsByRegion, getReportsByFormat, getNetworks, getEvents };

export default slice.reducer;
