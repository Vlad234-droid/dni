import { KeyboardEvent } from 'react';
import { DateObjectUnits, DateTime } from 'luxon';
import { isAnyDateFragmentEmpty } from '@beans/helpers';
import padStart from 'lodash.padstart';
import findIndex from 'lodash.findindex';

import {
  START_TIME_OPTION,
  END_TIME_OPTION,
  HOUR_KEY,
  MINUTE_KEY,
  TIME_SEPARATOR,
  TIME_FORMAT,
  TIME_ARIA_LABEL,
  TIME_INPUT_MAX_LIMITS,
} from '../config/dateTime';
import { Time, TimePart, ValidTime, Date } from '../config/types';

export const getAvailableTimeOptions = (startTime = START_TIME_OPTION, endTime = END_TIME_OPTION, minutes = 0) => {
  let start = startTime;
  const options = [];

  while (start <= endTime) {
    options.push({
      hh: start.toString(),
      mm: getStringWithLeadingZero(minutes.toString()),
    });
    start++;
  }

  return options;
};

export const getDateObject = (dateTime?: DateObjectUnits) => {
  const { year = '', month = '', day = '' } = dateTime || {};

  return {
    dd: getStringWithLeadingZero(day.toString()),
    mm: getStringWithLeadingZero(month.toString()),
    yyyy: year.toString(),
  };
};

export const getTimeObject = (dateTime?: DateObjectUnits) => {
  const { hour = '', minute = '' } = dateTime || {};

  return {
    hh: getStringWithLeadingZero(hour.toString()),
    mm: getStringWithLeadingZero(minute.toString()),
  };
};

export const getStringWithLeadingZero = (string: string) =>
  string && string.length < 2 ? padStart(string, 2, '0') : string;

export const getTimeWithLeadingZero = (time: Time) => ({
  hh: getStringWithLeadingZero(time.hh),
  mm: getStringWithLeadingZero(time.mm),
});

export const getTimeFragments = (timeFormat = TIME_FORMAT, timeSeparator = TIME_SEPARATOR) =>
  timeFormat.split(timeSeparator) as TimePart[];

export const isTimeOptionActive = (selected: Time, option: Time) =>
  selected[HOUR_KEY] === option[HOUR_KEY] && selected[MINUTE_KEY] === option[MINUTE_KEY];

export const getTimeValue = (time: Time) => {
  // isAnyDateFragmentEmpty internally uses separator '-'
  if (isAnyDateFragmentEmpty(time, TIME_FORMAT)) return '';

  const { hh, mm } = time;

  return TIME_FORMAT.replace(HOUR_KEY, hh).replace(MINUTE_KEY, padStart(mm, 2, '0'));
};

export const getKey = (event: KeyboardEvent) => {
  const { charCode, which } = event;

  return !charCode ? which : charCode;
};

export const isLastTimeFragment = (index: number, timeFragments: Array<string>) => index === timeFragments.length - 1;

export const getAriaLabel = (time: Time) => `${TIME_ARIA_LABEL}: ${getTimeValue(time)}`;

export const isFragmentFilled = (value: Time, fragmentType: TimePart) =>
  value[fragmentType].length === fragmentType.length;

export const areFragmentsFilled = (value: Time) =>
  isFragmentFilled(value, HOUR_KEY) && isFragmentFilled(value, MINUTE_KEY);

export const getIndexOfTimeOption = (options: Array<Time>, time: Time) =>
  findIndex(options, { [HOUR_KEY]: time[HOUR_KEY] });

export const isTypedValueValid = (value?: string | number) => {
  if (!value) return true;

  return !isNaN(value as number);
};

export const isTimeFragmentValid = (type: TimePart, value: string | number) =>
  isTypedValueValid(value) && !(value > TIME_INPUT_MAX_LIMITS[type]);

export const getTimeValidationObject = (time: Time) =>
  (Object.keys(time) as TimePart[]).reduce((obj: ValidTime, timeFragment: TimePart) => {
    obj[timeFragment] = isTimeFragmentValid(timeFragment, time[timeFragment]);
    return obj;
  }, {} as ValidTime);

export const getAriaDescribedBy = (id: string, error: boolean) => (error && `${id}-error`) || undefined;

export const getDateTimeFromObject = (date: Date, time: Time) =>
  DateTime.fromObject({
    month: Number(date.mm),
    day: Number(date.dd),
    year: Number(date.yyyy),
    hour: Number(time.hh),
    minute: Number(time.mm),
  });
