import keyBy from 'lodash.keyby';
import sort from 'lodash.filter';

import { FULL_DAY_FORMAT, isoDateToFormat, now, dateMinusDuration, fromIsoDate } from 'utils/date';
import API from 'utils/api';
import store from 'store';

import * as T from '../config/types';
import color from '../config/color';

const getDatePointState = () =>
  ({
    dd: '',
    mm: '',
    yyyy: '',
  } as T.DatePoint);

const getDateIntervalState = () =>
  ({
    from: getDatePointState(),
    to: getDatePointState(),
  } as T.Interval);

const getChartState = () =>
  ({
    elements: {},
    entities: [],
  } as T.ChartItem);

const getGroupState = () => ({
  chart: getChartState(),
  statistics: [],
  dateInterval: getDateIntervalState(),
  color: {
    ...color,
  },
  counter: 0,
});

const getGroupByPeriodState = () =>
  ({
    ...getGroupState(),
  } as T.GroupByPeriod);

const getGroupByRegionState = () =>
  ({
    ...getGroupState(),
  } as T.GroupByRegion);

const getGroupByFormatState = () =>
  ({
    ...getGroupState(),
  } as T.GroupByFormat);

const calculateDifference = ({ start, end }: { start: number; end: number }) => {
  if (start === 0 && end === 0) {
    return 0;
  }

  if (start === 0) {
    start += end;
    end *= 2;
  }

  return Math.round((end * 100) / start - 100);
};

const buildTimePeriodQuery = ({ entityType, groupBy, from, to, ids }: T.Params) => {
  const requestQuery = {
    entityType,
    groupBy,
    from,
    to,
    entityIds: ids?.join(','),
  };

  return requestQuery;
};

const buildRegionOrFormatQuery = ({ entityType, from, to, ids }: T.Params) => {
  const requestQuery = {
    entityType,
    from,
    to,
    entityIds: ids?.join(','),
  };

  return requestQuery;
};

const reportsByTimeMiddleware = async ({
  entityType,
  periodType,
  from,
  to,
  ids,
}: {
  entityType: T.EntityType;
  periodType?: T.PeriodType;
  from?: string;
  to?: string;
  ids?: (number | string)[];
}): Promise<{ entityType: T.EntityType; data: T.GroupByPeriod }> => {
  const date = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

  date.setUTCHours(0, 0, 0, 0);

  let groupBy = T.GroupBy.MONTH;

  const interval = {
    from: '',
    to: date.toISOString(),
  };

  switch (periodType) {
    case T.PeriodType.THIS_YEAR:
      groupBy = T.GroupBy.WEEK;
      date.setFullYear(date.getFullYear() - 1);
      date.setUTCHours(0, 0, 0, 0);
      interval.from = date.toISOString();
      break;

    case T.PeriodType.LAST_MONTH:
      groupBy = T.GroupBy.DAY;
      date.setMonth(date.getMonth() - 1);
      date.setUTCHours(0, 0, 0, 0);
      interval.from = date.toISOString();
      break;

    case T.PeriodType.LAST_WEEK:
      groupBy = T.GroupBy.DAY;
      date.setDate(date.getDate() - 7);
      date.setUTCHours(0, 0, 0, 0);
      interval.from = date.toISOString();
      break;
  }

  const query = buildTimePeriodQuery({
    entityType,
    groupBy,
    ...(periodType === T.PeriodType.PICK_PERIOD
      ? {
          from,
          to,
        }
      : interval),
    ids,
  });

  const { data, metadata } = await API.report.members<T.MembersResponse<T.MembersEntityData>>(query);

  const { entities } = store.getState().reports[entityType];
  const groupState = store.getState().reports.groups[T.ReportType.PERIOD];
  const group = getGroupState() as T.GroupByPeriod;

  group.color = groupState.color;
  group.dateInterval = groupState.dateInterval;
  group.counter = groupState.counter || 0;

  group.chart.entities = data.map((element) => {
    const point = {
      name: isoDateToFormat(element.period, FULL_DAY_FORMAT),
    } as T.Point;

    element.entities.forEach(({ entityId, subscribers }) => {
      const entityName = entities[entityId]?.title as string;
      point[entityName] = subscribers;
    });

    return point;
  });

  group.statistics = metadata.entities.map(
    ({ entityId, entityType, startSubscribers, endSubscribers, joined, leaved }: T.EntryWithId) => {
      const row = {
        entityId,
        entityType,
        startSubscribers,
        endSubscribers,
        joined,
        leaved,
      } as T.StatisticsItemByPeriod;

      row.percentages = calculateDifference({
        start: startSubscribers!,
        end: endSubscribers!,
      });

      const rowState = groupState.statistics.find(
        (element: T.StatisticsItemByPeriod) => element.entityId == row.entityId,
      );

      row.name = entities[entityId]?.title || 'Default entity name';
      row.checked = typeof rowState?.['checked'] === 'boolean' ? rowState.checked : false;
      row.color = typeof rowState?.['color'] === 'string' ? rowState.color : '';

      return row;
    },
  );

  group.chart.elements = keyBy(sort(group.statistics, ['checked', true]), (o: Partial<{ name: string }>) => o.name);

  return {
    entityType,
    data: group,
  };
};

const reportsByRegionMiddleware = async ({
  entityType,
  from,
  to,
  ids,
}: {
  entityType: T.EntityType;
  from?: string;
  to?: string;
  ids?: (number | string)[];
}): Promise<{ entityType: T.EntityType; data: T.GroupByRegion }> => {
  const dateTo = to || now().toISOString();
  const dateFrom = from || dateMinusDuration(dateTo, { week: 1 }).toISOString();

  const interval = {
    from: dateFrom,
    to: dateTo,
  };

  const query = buildRegionOrFormatQuery({
    entityType,
    ...interval,
    ids,
  });

  const { data, metadata } = await API.report.regions<T.Response<T.RegionEntityData>>(query);

  const { entities } = store.getState().reports[entityType];
  const groupState = store.getState().reports.groups[T.ReportType.REGION];
  const group = getGroupState() as T.GroupByRegion;

  group.color = groupState.color;
  group.dateInterval.from = toDateInterval(dateFrom);
  group.dateInterval.to = toDateInterval(dateTo);
  group.counter = groupState.counter || 0;

  group.statistics = metadata.entities.map(({ entityId }) => {
    const entityName = entities[entityId]?.title || 'Default entity name';
    const row = {
      entityId,
      entityName,
    } as T.StatisticsItemByRegion;

    const rowState = groupState.statistics.find(
      (element: T.StatisticsItemByRegion) => element.entityId == row.entityId,
    );

    row.name = entityName;
    row.checked = typeof rowState?.['checked'] === 'boolean' ? rowState.checked : false;
    row.color = typeof rowState?.['color'] === 'string' ? rowState.color : '';

    const dataEntities = data.find((element) => element.entityId == entityId)!.entities || [];

    row.participants = dataEntities.reduce((acc, { endSubscribers }) => {
      const newValue = acc + endSubscribers!;

      return newValue;
    }, 0);

    row.elements = dataEntities.map(({ regionName, endSubscribers }) => ({
      regionName,
      count: endSubscribers!,
    }));

    return row;
  });

  group.chart.entities = sort(group.statistics, ['checked', true]);

  group.chart.elements = groupState.chart.elements;

  return {
    entityType,
    data: group,
  };
};

const reportsByFormatMiddleware = async ({
  entityType,
  from,
  to,
  ids,
}: {
  entityType: T.EntityType;
  from?: string;
  to?: string;
  ids?: (number | string)[];
}): Promise<{ entityType: T.EntityType; data: T.GroupByFormat }> => {
  const dateTo = to || now().toISOString();
  const dateFrom = from || dateMinusDuration(dateTo, { week: 1 }).toISOString();

  const interval = {
    from: dateFrom,
    to: dateTo,
  };

  const query = buildRegionOrFormatQuery({
    entityType,
    ...interval,
    ids,
  });

  const { data, metadata } = await API.report.departments<T.Response<T.FormatEntityData>>(query);

  const { entities } = store.getState().reports[entityType];
  const groupState = store.getState().reports.groups[T.ReportType.FORMAT];
  const group = getGroupState() as T.GroupByFormat;

  group.color = groupState.color;
  group.dateInterval.from = toDateInterval(dateFrom);
  group.dateInterval.to = toDateInterval(dateTo);
  group.counter = groupState.counter || 0;

  group.statistics = metadata.entities.map(({ entityId }) => {
    const entityName = entities[entityId]?.title || 'Default entity name';
    const row = {
      entityId,
      entityName,
    } as T.StatisticsItemByFormat;

    const rowState = groupState.statistics.find(
      (element: T.StatisticsItemByFormat) => element.entityId == row.entityId,
    );

    row.name = entityName;
    row.checked = typeof rowState?.['checked'] === 'boolean' ? rowState.checked : false;
    row.color = typeof rowState?.['color'] === 'string' ? rowState.color : '';

    const dataEntities = data.find((element) => element.entityId == entityId)!.entities || [];

    row.participants = dataEntities.reduce((acc, { endSubscribers }) => {
      const newValue = acc + endSubscribers!;

      return newValue;
    }, 0);

    row.elements = dataEntities.map(({ departmentName, endSubscribers }) => ({
      department: departmentName,
      count: endSubscribers!,
    }));

    return row;
  });

  group.chart.entities = sort(group.statistics, ['checked', true]);

  group.chart.elements = groupState.chart.elements;

  return {
    entityType,
    data: group,
  };
};

const toDateInterval = (isoDate: string) => {
  const addLeadingZero = (value: string | number) => `0${value}`.slice(-2);
  const date = fromIsoDate(isoDate);

  return {
    dd: addLeadingZero(date.getDate()),
    mm: addLeadingZero(date.getMonth() + 1),
    yyyy: String(date.getFullYear()),
  };
};

export {
  getGroupByPeriodState,
  getGroupByRegionState,
  getGroupByFormatState,
  reportsByTimeMiddleware,
  reportsByRegionMiddleware,
  reportsByFormatMiddleware,
  toDateInterval,
};
