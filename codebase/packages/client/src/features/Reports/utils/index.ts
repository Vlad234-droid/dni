import { useSelector } from 'react-redux';
import keyBy from 'lodash.keyby';
import sort from 'lodash.filter';

import { FULL_DAY_FORMAT, isoDateToFormat } from 'utils/date';
import API from 'utils/api';
import store from 'store';

import * as T from '../config/types';

const colorConfig = {
  '#009900': false,
  '#FF0000': false,
  black: false,
  brown: false,
  purple: false,
};

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

const getStatisticsState = () => [] as T.StatisticsItem[];

const getGraphicsState = () =>
  ({
    chart: getChartState(),
    statistics: getStatisticsState(),
    dateInterval: getDateIntervalState(),
    color: {
      ...colorConfig,
    },
  } as T.GraphicsItem);

const getEntityState = () =>
  ({
    filter: T.PERIOD,
    [T.PERIOD]: {
      filter: T.Period.THIS_YEAR,
      [T.Period.THIS_YEAR]: getGraphicsState(),
      [T.Period.LAST_MONTH]: getGraphicsState(),
      [T.Period.LAST_WEEK]: getGraphicsState(),
      [T.Period.PICK_PERIOD]: {
        ...getGraphicsState(),
        dateInterval: getDateIntervalState(),
      },
    },
    [T.REGION]: {
      filter: T.Period.THIS_YEAR,
      [T.Period.THIS_YEAR]: getGraphicsState(),
    },
    [T.FORMAT]: {
      filter: T.Period.THIS_YEAR,
      [T.Period.THIS_YEAR]: getGraphicsState(),
    },
  } as T.EntityItem);

const buildTimePeriodQuery = ({ entityType, groupBy, from, to, ids }: T.Params) => {
  const requestQuery = {
    entityType: entityType == 0 ? 'NETWORK' : 'EVENT',
    groupBy,
    from,
    to,
    entityIds: ids.join(','),
  };

  console.log(`requestQuery: ${requestQuery}`);
  return requestQuery;
};

const reportsMiddleware = async ({ entityType, filter, filterFilter, from, to }: T.ReportsMiddlewareArgs) => {
  const { ids } = store.getState()[entityType === 0 ? 'networks' : 'events'];

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, metadata } = await API.report.timePeriods<any>(query);

  const { entities } = store.getState()[entityType === 0 ? 'networks' : 'events'];

  return {
    entityType,
    filter,
    filterFilter,
    data,
    metadata,
    entities,
  };
};

const setDefaultGraphicsState = ({ group }: { group: ReturnType<typeof getGraphicsState> }) => {
  group.chart = getChartState();
  group.statistics = getStatisticsState();
};

const setGraphicsState = ({
  group,
  data = [],
  metadata = [],
  entities = {},
}: {
  group: ReturnType<typeof getGraphicsState>;
  data: any;
  metadata: any;
  entities: { [key: string]: { id: number; title: string } };
}) => {
  group.chart = getChartState();

  group.chart.entities = data.map(({ period, entities }: { period: string; entities: T.EntityData[] }) => {
    const point = {
      name: isoDateToFormat(period, FULL_DAY_FORMAT),
    } as {
      [key: string]: number | string;
    };

    entities.forEach(({ entityId, entityType, subscribe }) => {
      point[entityId] = subscribe;
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
      } as T.EntityData & {
        percentages: number;
        checked: boolean;
      };

      let start = startMembers;
      let end = endMembers;

      if (start === 0 && end === 0) {
        row.percentages = 0;
      } else {
        if (start === 0) {
          start += end;
          end *= 2;
        }

        row.percentages = Math.round((end * 100) / start - 100);
      }

      const rowState = group.statistics.find((element) => element.entityId == row.entityId);

      row.name = entities[entityId].title || 'Default entity name';
      row.checked = typeof rowState?.['checked'] === 'boolean' ? rowState.checked : false;
      row.color = typeof rowState?.['color'] === 'string' ? rowState.color : '';

      return row;
    },
  );

  group.chart.elements = keyBy(
    sort(group.statistics, ['checked', true]),
    (o: Partial<{ entityId: number; name: string }>) => o.entityId,
  );
};

export { getEntityState, reportsMiddleware, setDefaultGraphicsState, setGraphicsState };
