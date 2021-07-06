/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityId } from '@reduxjs/toolkit';
import Loading from 'types/loading';

const PERIOD = 'PERIOD';
const REGION = 'REGION';
const FORMAT = 'FORMAT';

enum Entity {
  network,
  event,
}

enum Period {
  THIS_YEAR = 'This year',
  LAST_MONTH = 'Last month',
  LAST_WEEK = 'Last week',
  PICK_PERIOD = 'Pick period',
}

enum Region {
  PICK_PERIOD = 'Pick period',
}

enum Format {
  PICK_PERIOD = 'Pick period',
}

type Filter = typeof PERIOD | typeof REGION | typeof FORMAT;

type FilterFilter = Period | Region | Format;

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
  groupBy?: string;
  from: string;
  to: string;
  ids: EntityId[];
};

type ChartItem = {
  elements: {};
  entities: any[];
};

type StatisticsItem = {
  entityId: number | string;
  entityType: string;
  startMembers: number;
  endMembers: number;
  percentages: number;
  subscribe: number;
  leave: number;
  name: string;
  color: string;
  checked: boolean;
};

type StatisticsItemByRegion = {
  entityId: number | string;
  entityName: string;
  name: string;
  color: string;
  checked: boolean;
  participants: number;
  elements: {
    regionName: string;
    count: number;
  }[];
};

type StatisticsItemByFormat = {
  entityId: number | string;
  entityName: string;
  name: string;
  color: string;
  checked: boolean;
  participants: number;
  elements: {
    department: string;
    count: number;
  }[];
};

type Statistics = (StatisticsItem | StatisticsItemByRegion | StatisticsItemByFormat)[];

type GraphicsItem = {
  chart: ChartItem;
  statistics: Statistics;
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
    [Period.PICK_PERIOD]: GraphicsItem;
  };
  [FORMAT]: {
    filter: Format;
    [Period.PICK_PERIOD]: GraphicsItem;
  };
};

type State = {
  entityType: Entity;
  [Entity.network]: any;
  [Entity.event]: any;
  loading: Loading;
  error?: string;
};

type EntryId = {
  entityId: number;
  entityType: string;
};

type Entry = {
  joined: number;
  leaved: number;
  regionName: string;
  endSubscribers?: number;
  startSubscribers?: number;
};

type EntryWithId = Entry & EntryId;

type Range = {
  from: string;
  to: string;
};

type PeriodEntityData = {
  period: string;
  entities: Array<
    Entry &
      EntryId & {
        subscribers: number;
      }
  >;
};

type RegionEntityData = {
  entities: Array<
    Entry & {
      regionName: string;
    }
  >;
} & EntryId;

type FormatEntityData = {
  entities: Array<
    Entry & {
      departmentName: string;
    }
  >;
} & EntryId;

type EntityMetadata = {
  period: Range;
  entities: Array<EntryWithId>;
};

type Response<T> = {
  data: T[];
  metadata: EntityMetadata;
};

type EntityDataByFormat = {
  entityId: number | string;
  entityName: string;
  participants: {
    department: string;
    count: number;
  }[];
};

type PeriodFulfilledArgs = {
  entityType: Entity;
  filter: Filter;
  filterFilter: Period;
  data: any;
};

type RegionFulfilledArgs = {
  entityType: Entity;
  data: any;
};

type FormatFulfilledArgs = {
  entityType: Entity;
  data: any;
};

type Point = {
  name: string;
  [key: string]: number | string;
};

export type {
  State,
  Filter,
  FilterFilter,
  Interval,
  Params,
  Response,
  PeriodEntityData,
  RegionEntityData,
  FormatEntityData,
  EntityMetadata,
  EntityDataByFormat,
  EntryWithId,
  ChartItem,
  Statistics,
  StatisticsItem,
  StatisticsItemByRegion,
  StatisticsItemByFormat,
  GraphicsItem,
  EntityItem,
  DatePoint,
  PeriodFulfilledArgs,
  RegionFulfilledArgs,
  FormatFulfilledArgs,
  Point,
};

export { Entity, Period, Region, Format, GroupBy };
export { PERIOD, REGION, FORMAT };
