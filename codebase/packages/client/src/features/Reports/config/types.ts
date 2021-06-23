import { EntityId } from '@reduxjs/toolkit';
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

enum Region {
  ALL = 'All',
}

enum Format {
  ALL = 'All',
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
  ids: EntityId[];
};

type ChartItem = {
  elements: {};
  entities: {
    [key: string]: string | number;
  }[];
};

type StatisticsItem = {
  entityId: string;
  name: string;
  members: number;
  subscribe: number;
  leave: number;
  color: string;
  checked: boolean;
  subscribersAPS: number;
  subscribersAPE: number;
  percentages: number;
};

type GraphicsItem = {
  chart: ChartItem;
  statistics: StatisticsItem[];
  dateInterval: Interval;
  color: {
    [key: string]: boolean;
  };
  counter: number;
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
    filter: Region;
    [Region.ALL]: GraphicsItem;
  };
  [FORMAT]: {
    filter: Format;
    [Format.ALL]: GraphicsItem;
  };
};

type EntityData = {
  entityId: number | string;
  entityType: string;
  members: number;
  startMembers: number;
  endMembers: number;
  subscribe: number;
  leave: number;
  name: string;
  color: string;
  title: string;
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
  data: any;
};

type Point = {
  name: string;
  [key: string]: number | string;
};

type RowData = EntityData & {
  percentages: number;
  checked: boolean;
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
  Point,
  RowData,
};

export { Entity, Period, Region, Format, GroupBy };
export { PERIOD, REGION, FORMAT };
