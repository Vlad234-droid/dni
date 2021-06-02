import { PERIOD, REGION, FORMAT } from './filters';

export type Filter = typeof PERIOD | typeof REGION | typeof FORMAT;

export enum Period {
  CURRENT_YEAR = 'This year',
  LAST_MONTH = 'Last month',
  LAST_WEEK = 'Last week',
  PICK_PERIOD = 'Pick period',
}
