import { Period } from './types';

export const PERIOD = 'PERIOD';
export const REGION = 'REGION';
export const FORMAT = 'FORMAT';

export const filters = [
  {
    key: PERIOD,
    title: 'Time period',
  },
  {
    key: REGION,
    title: 'Region',
  },
  {
    key: FORMAT,
    title: 'Format',
  },
];

export const filtersByPeriod = [
  {
    title: Period.CURRENT_YEAR,
    id: 1,
  },
  {
    title: Period.LAST_MONTH,
    id: 2,
  },
  {
    title: Period.LAST_WEEK,
    id: 3,
  },
  {
    title: Period.PICK_PERIOD,
    id: 4,
  },
];
