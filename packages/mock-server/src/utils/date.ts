import { DateTime } from 'luxon';

const DATE_FORMAT = 'yyyy-MM-dd';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

const dateToFormat = (date: Date, format: string) =>
  DateTime.fromJSDate(date).toFormat(format);

const dateToIso = (date: Date) => DateTime.fromJSDate(date).toISO();

export { dateToFormat, dateToIso, DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT };
