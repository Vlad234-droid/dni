import keyBy from 'lodash.keyby';
import sort from 'lodash.filter';

import { FULL_DAY_FORMAT, isoDateToFormat } from 'utils/date';
import API from 'utils/api';
import store from 'store';

import * as T from '../config/types';

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
  //return `?entityType=${entityType}&groupBy=${groupBy}&from=${from}&to=${to}&entityIds=${ids}`;
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

  return {
    entityType,
    filter,
    filterFilter,
    data,
    metadata,
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
}: {
  group: ReturnType<typeof getGraphicsState>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any;
}) => {
  group.chart = getChartState();

  group.chart.entities = data.map(({ period, entities }: { period: string; entities: T.EntityData[] }) => {
    const point = {
      name: isoDateToFormat(period, FULL_DAY_FORMAT),
    } as {
      [key: string]: number | string;
    };

    entities.forEach(({ id, entityType, subscribe }) => {
      point[`${entityType}-${id}`] = subscribe;
    });

    return point;
  });

  group.statistics = metadata.entities.map(({ id, entityType, subscribe, leave }: T.EntityData) => {
    const row = {
      id,
      entityType,
      subscribe,
      leave,
    } as T.EntityData & {
      subscribersAPS: number;
      subscribersAPE: number;
      percentages: number;
      checked: boolean;
    };

    const indexFirst = 0;
    const indexLast = data.length - 1;

    row.subscribersAPS = data[indexFirst].entities.filter((el: T.EntityData) => el.id === id).subscribe;
    row.subscribersAPE = data[indexLast].entities.filter((el: T.EntityData) => el.id === id).subscribe;

    const { subscribersAPS, subscribersAPE } = row;

    row.percentages = 100 * Math.abs((subscribersAPS - subscribersAPE) / ((subscribersAPS + subscribersAPE) / 2));

    row.checked = true;

    return row;
  });

  group.chart.elements = keyBy(
    sort(group.statistics, ['checked', true]),
    (o: Partial<{ id: number; name: string }>) => o.name,
  );
};

export { getEntityState, reportsMiddleware, setDefaultGraphicsState, setGraphicsState };
