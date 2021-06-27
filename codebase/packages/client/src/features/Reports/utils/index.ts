import keyBy from 'lodash.keyby';
import sort from 'lodash.filter';

import { FULL_DAY_FORMAT, isoDateToFormat } from 'utils/date';
import API from 'utils/api';
import store from 'store';

import * as T from '../config/types';
import color from '../config/color';
import { getRegionsData, getDepartmentsData } from '../config/data';

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

const getStatisticsState = () => [] as T.Statistics;

const getGraphicsState = () =>
  ({
    chart: getChartState(),
    statistics: getStatisticsState(),
    dateInterval: getDateIntervalState(),
    color: {
      ...color,
    },
    counter: 0,
  } as T.GraphicsItem);

const getEntityState = () =>
  ({
    filter: T.PERIOD,
    [T.PERIOD]: {
      filter: T.Period.THIS_YEAR,
      [T.Period.THIS_YEAR]: getGraphicsState(),
      [T.Period.LAST_MONTH]: getGraphicsState(),
      [T.Period.LAST_WEEK]: getGraphicsState(),
      [T.Period.PICK_PERIOD]: getGraphicsState(),
    },
    [T.REGION]: {
      filter: T.Region.ALL,
      [T.Region.ALL]: getGraphicsState(),
    },
    [T.FORMAT]: {
      filter: T.Format.ALL,
      [T.Format.ALL]: getGraphicsState(),
    },
  } as T.EntityItem);

const calculateDifference = ({ start, end }: { start: number; end: number }) => {
  if (start === 0 && end === 0) {
    return 0;
  } else {
    if (start === 0) {
      start += end;
      end *= 2;
    }

    return Math.round((end * 100) / start - 100);
  }
};

const buildTimePeriodQuery = ({ entityType, groupBy, from, to, ids }: T.Params) => {
  const requestQuery = {
    entityType: entityType == 0 ? 'NETWORK' : 'EVENT',
    groupBy,
    from,
    to,
    entityIds: ids.join(','),
  };

  return requestQuery;
};

const reportsByTimeMiddleware = async ({
  entityType,
  filter,
  filterFilter,
  from,
  to,
}: {
  entityType: T.Entity;
  filter: T.Filter;
  filterFilter: T.Period;
  from: string;
  to: string;
}) => {
  const { ids, entities } = store.getState()[entityType === 0 ? 'networks' : 'events'];
  const date = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

  date.setUTCHours(0, 0, 0, 0);

  let groupBy = T.GroupBy.MONTH;

  const interval = {
    from: '',
    to: date.toISOString(),
  };

  switch (filterFilter) {
    case T.Period.THIS_YEAR:
      groupBy = T.GroupBy.WEEK;
      date.setFullYear(date.getFullYear() - 1);
      date.setUTCHours(0, 0, 0, 0);
      interval.from = date.toISOString();
      break;

    case T.Period.LAST_MONTH:
      groupBy = T.GroupBy.DAY;
      date.setMonth(date.getMonth() - 1);
      date.setUTCHours(0, 0, 0, 0);
      interval.from = date.toISOString();
      break;

    case T.Period.LAST_WEEK:
      groupBy = T.GroupBy.DAY;
      date.setDate(date.getDate() - 7);
      date.setUTCHours(0, 0, 0, 0);
      interval.from = date.toISOString();
      break;
  }

  const query = buildTimePeriodQuery({
    entityType,
    groupBy,
    ...(filterFilter === T.Period.PICK_PERIOD
      ? {
          from,
          to,
        }
      : interval),
    ids,
  });

  const { data, metadata } = await API.report.timePeriods<any>(query);

  const groupState = store.getState().reports[entityType][filter][filterFilter];
  const group = getGraphicsState() as T.GraphicsItem;

  group.color = groupState.color;
  group.dateInterval = groupState.dateInterval;

  group.chart.entities = data.map((element: { period: string; entities: T.EntityData[] }) => {
    const point = {
      name: isoDateToFormat(element.period, FULL_DAY_FORMAT),
    } as T.Point;

    element.entities.forEach(({ entityId, members }: any) => {
      const entityName = entities[entityId]?.title as string;

      point[entityName] = members;
    });

    return point;
  });

  group.statistics = metadata.entities.map(
    ({ entityId, entityType, startMembers, endMembers, subscribe, leave }: T.EntityData) => {
      const row = {
        entityId,
        entityType,
        startMembers,
        endMembers,
        subscribe,
        leave,
      } as T.StatisticsItem;

      row.percentages = calculateDifference({
        start: startMembers,
        end: endMembers,
      });

      const rowState = groupState.statistics.find((element: T.StatisticsItem) => element.entityId == row.entityId);

      row.name = entities[entityId]?.title || 'Default entity name';
      row.checked = typeof rowState?.['checked'] === 'boolean' ? rowState.checked : false;
      row.color = typeof rowState?.['color'] === 'string' ? rowState.color : '';

      return row;
    },
  );

  group.chart.elements = keyBy(sort(group.statistics, ['checked', true]), (o: Partial<{ name: string }>) => o.name);

  return {
    entityType,
    filter,
    filterFilter,
    data: group,
  };
};

const reportsByRegionMiddleware = async ({ entityType }: { entityType: T.Entity }) => {
  const { ids } = store.getState()[entityType === 0 ? 'networks' : 'events'];

  // req with ids...
  const data = await getRegionsData();

  const groupState = store.getState().reports[entityType][T.REGION][T.Region.ALL];
  const group = getGraphicsState() as T.GraphicsItem;

  group.color = groupState.color;

  group.statistics = data.map(({ entityId, entityName, participants }: T.EntityDataByRegion) => {
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

    row.participants = participants.reduce((acc, { count }) => {
      const newValue = acc + count;

      return newValue;
    }, 0);

    row.elements = participants;

    return row;
  });

  group.chart.entities = sort(group.statistics, ['checked', true]);

  group.chart.elements = groupState.chart.elements;

  return {
    entityType,
    data: group,
  };
};

const reportsByFormatMiddleware = async ({ entityType }: { entityType: T.Entity }) => {
  const { ids } = store.getState()[entityType === 0 ? 'networks' : 'events'];

  // req with ids...
  const data = await getDepartmentsData();

  const groupState = store.getState().reports[entityType][T.FORMAT][T.Format.ALL];
  const group = getGraphicsState() as T.GraphicsItem;

  group.color = groupState.color;

  group.statistics = data.map(({ entityId, entityName, participants }: T.EntityDataByFormat) => {
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

    row.participants = participants.reduce((acc, { count }) => {
      const newValue = acc + count;

      return newValue;
    }, 0);

    row.elements = participants;

    return row;
  });

  group.chart.entities = sort(group.statistics, ['checked', true]);

  group.chart.elements = groupState.chart.elements;

  return {
    entityType,
    data: group,
  };
};

export { getEntityState, reportsByTimeMiddleware, reportsByRegionMiddleware, reportsByFormatMiddleware };
