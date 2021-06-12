import Loading from 'types/loading';

const PERIOD = 'PERIOD';
const REGION = 'REGION';
const FORMAT = 'FORMAT';

enum Entity {
  NETWORK,
  EVENT,
}

enum Period {
  THIS_YEAR = 'This year',
  LAST_MONTH = 'Last month',
  LAST_WEEK = 'Last week',
  PICK_PERIOD = 'Pick period',
}

type State = {
  entityType: Entity;
  [Entity.NETWORK]: any;
  [Entity.EVENT]: any;
  loading: Loading;
  error?: string;
};

type Filter = typeof PERIOD | typeof REGION | typeof FORMAT;

enum GroupBy {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

type DatePoint = {
  dd: string;
  mm: string;
  yyyy: string;
};

type Interval = {
  from: DatePoint;
  to: DatePoint;
};

type Params = {
  entityType: Entity;
  groupBy: string;
  from: string;
  to: string;
  ids: string;
};

type ChartItem = {
  elements: {};
  entities: {
    [key: string]: string | number;
  }[];
};

type StatisticsItem = {
  id: string;
  name: string;
  members: number;
  subscribe: number;
  leave: number;
  color?: string;
  checked: boolean;
  subscribersAPS: number;
  subscribersAPE: number;
  percentages: number;
};

type GraphicsItem = {
  chart: ChartItem;
  statistics: StatisticsItem[];
  dateInterval: Interval;
};

type EntityItem = {
  filter: Filter;
  [PERIOD]: {
    filter: Period;
    [Period.THIS_YEAR]: GraphicsItem;
    [Period.LAST_MONTH]: GraphicsItem;
    [Period.LAST_WEEK]: GraphicsItem;
    [Period.PICK_PERIOD]: GraphicsItem;
  };
  [REGION]: {
    filter: Period;
    [Period.THIS_YEAR]: GraphicsItem;
  };
  [FORMAT]: {
    filter: Period;
    [Period.THIS_YEAR]: GraphicsItem;
  };
};

type EntityData = {
  id: number | string;
  entityType: string;
  members: number;
  subscribe: number;
  leave: number;
};

type ReportsMiddlewareArgs = {
  entityType: Entity;
  filter: Filter;
  filterFilter: Period;
  from: string;
  to: string;
};

type FulfilledArgs = {
  entityType: Entity;
  filter: Filter;
  filterFilter: Period;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any;
};

export type {
  State,
  Filter,
  Interval,
  Params,
  ChartItem,
  StatisticsItem,
  GraphicsItem,
  EntityItem,
  DatePoint,
  EntityData,
  ReportsMiddlewareArgs,
  FulfilledArgs,
};

export { Entity, Period, GroupBy };
export { PERIOD, REGION, FORMAT };
