import { DateTime, DurationUnit, DurationObject } from 'luxon';

const DATE_FORMAT = 'yyyy-MM-dd';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
const FULL_FORMAT = "cccc, dd LLLL yyyy 'at' HH:mm";
const FULL_DAY_FORMAT = 'LLLL dd, yyyy';

const dateToFormat = (date: Date, format: string) => DateTime.fromJSDate(date).toFormat(format);

const isoDateToFormat = (date: string, format: string) => DateTime.fromISO(date).toFormat(format);

const firstDayOf = (duration: DurationUnit) => DateTime.local().startOf(duration);

const lastDayOf = (duration: DurationUnit) => DateTime.local().endOf(duration);

const addDuration = (duration: DurationObject) => DateTime.local().plus(duration).toJSDate();

const minusDuration = (duration: DurationObject) => DateTime.local().minus(duration).toJSDate();

const dateMinusDuration = (date: string, duration: DurationObject) => DateTime.fromISO(date).minus(duration).toJSDate();

const now = () => DateTime.local().toJSDate();

export {
  dateToFormat,
  isoDateToFormat,
  firstDayOf,
  lastDayOf,
  addDuration,
  minusDuration,
  dateMinusDuration,
  now,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  FULL_FORMAT,
  FULL_DAY_FORMAT,
};
