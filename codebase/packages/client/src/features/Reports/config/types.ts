import { EntityId, EntityState } from '@reduxjs/toolkit';

import Loading from 'types/loading';
import Network from 'features/Network';
import Event from 'features/Event';

enum ReportType {
  PERIOD = 'period',
  REGION = 'region',
  FORMAT = 'format',
}

enum EntityType {
  NETWORK = 'network',
  EVENT = 'event',
}

enum PeriodType {
  THIS_YEAR = 'This year',
  LAST_MONTH = 'Last month',
  LAST_WEEK = 'Last week',
  PICK_PERIOD = 'Pick period',
}

enum GroupBy {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

enum Prop {
  FROM = 'from',
  TO = 'to',
}

type DatePoint = {
  dd: string;
  mm: string;
  yyyy: string;
};

type Interval = {
  [Prop.FROM]: DatePoint;
  [Prop.TO]: DatePoint;
};

type Params = {
  entityType: EntityType;
  groupBy?: string;
  from?: string;
  to?: string;
  ids?: EntityId[];
};

type ChartItem = {
  elements: any;
  entities: any[];
};

type StatisticsItem = {
  entityId: number | string;
  entityType: string;
  entityName: string;
  name: string;
  color: string;
  checked: boolean;
  participants: number;
};

type StatisticsItemByPeriod = {
  startSubscribers: number;
  endSubscribers: number;
  percentages: number;
  joined: number;
  leaved: number;
} & StatisticsItem;

type StatisticsItemByRegion = {
  elements: {
    regionName: string;
    count: number;
  }[];
} & StatisticsItem;

type StatisticsItemByFormat = {
  elements: {
    department: string;
    count: number;
  }[];
} & StatisticsItem;

type Group = {
  chart: ChartItem;
  statistics: StatisticsItem[];
  dateInterval: Interval;
  color: {
    [key: string]: boolean;
  };
  counter: number;
};

type GroupByPeriod = {
  statistics: StatisticsItemByPeriod[];
} & Group;

type GroupByRegion = {
  statistics: StatisticsItemByRegion[];
} & Group;

type GroupByFormat = {
  statistics: StatisticsItemByFormat[];
} & Group;

type State = {
  filters: {
    reportType: ReportType;
    entityType: EntityType;
    periodType: PeriodType;
  };
  groups: {
    [ReportType.PERIOD]: GroupByPeriod;
    [ReportType.REGION]: GroupByRegion;
    [ReportType.FORMAT]: GroupByFormat;

    [EntityType.NETWORK]: [];
    [EntityType.EVENT]: [];
  };

  loading: Loading;
  error?: string;

  [EntityType.NETWORK]: EntityState<Network>;
  [EntityType.EVENT]: EntityState<Event>;
};

type EntryId = {
  entityId: number;
  entityType: string;
};

type Entry = {
  joined: number;
  leaved: number;
  // regionName: string;
  endSubscribers?: number;
  startSubscribers?: number;
};

type EntryWithId = Entry & EntryId;

type Range = {
  from: string;
  to: string;
};

// type PeriodEntityData = {
//   period: string;
//   entities: Array<
//     Entry &
//       EntryId & {
//         subscribers: number;
//       }
//   >;
// };

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

type MembersEntry = {
  joined: number;
  leaved: number;
  subscribers: number;
};

type MembersEntityData = {
  period: string;
  entities: Array<MembersEntry & EntryId>;
} & EntryId;

type MembersEntityMetadata = {
  granularity: string;
} & EntityMetadata;

type MembersResponse<T> = {
  data: T[];
  metadata: MembersEntityMetadata;
};

type EntityDataByFormat = {
  entityId: number | string;
  entityName: string;
  participants: {
    department: string;
    count: number;
  }[];
};

type Point = {
  name: string;
  [key: string]: number | string;
};

export type {
  State,
  Interval,
  Params,
  Response,
  // PeriodEntityData,
  RegionEntityData,
  FormatEntityData,
  EntityMetadata,
  EntityDataByFormat,
  EntryWithId,
  MembersEntry,
  MembersEntityData,
  MembersEntityMetadata,
  MembersResponse,
  ChartItem,
  StatisticsItem,
  StatisticsItemByPeriod,
  StatisticsItemByRegion,
  StatisticsItemByFormat,
  Group,
  GroupByPeriod,
  GroupByRegion,
  GroupByFormat,
  DatePoint,
  Point,
};

export { ReportType, EntityType, PeriodType, GroupBy, Prop };
