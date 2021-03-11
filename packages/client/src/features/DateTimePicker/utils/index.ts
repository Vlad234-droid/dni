import { KeyboardEvent } from 'react';
import { DateObjectUnits } from 'luxon';
import {
  ALLOWED_DATE_CHARACTERS,
  ALLOWED_KEY_CODES,
  KEY_CODES,
} from '@beans/date-input';
import { isAnyDateFragmentEmpty } from '@beans/helpers';
import padStart from 'lodash.padstart';
import findIndex from 'lodash.findindex';

import {
  START_TIME_OPTION,
  END_TIME_OPTION,
  DEFAULT_MINUTES,
  HOUR_KEY,
  MINUTE_KEY,
  TIME_SEPARATOR,
  TIME_FORMAT,
  TIME_ARIA_LABEL,
  TIME_INPUT_MAX_LIMITS,
} from '../config/dateTime';
import { Time, TimePart, ValidTime } from '../config/types';

export const getAvailableTimeOptions = () => {
  let start = START_TIME_OPTION;
  const options = [];

  while (start <= END_TIME_OPTION) {
    options.push({ hh: start.toString(), mm: DEFAULT_MINUTES });
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

export const timeFormatOrder = (
  timeFormat: TimePart | typeof TIME_FORMAT,
  timeSeparator = TIME_SEPARATOR,
) => timeFormat.split(timeSeparator) as TimePart[];

export const isTimeOptionActive = (current: Time, selected: Time) =>
  current[HOUR_KEY] === selected[HOUR_KEY] &&
  current[MINUTE_KEY] === selected[MINUTE_KEY];

export const getTimeValue = (time: Time, timeFormat: string = TIME_FORMAT) => {
  if (isAnyDateFragmentEmpty(time, timeFormat)) return '';

  const { hh, mm } = time;

  return timeFormat
    .replace(HOUR_KEY, hh || '')
    .replace(MINUTE_KEY, padStart(mm, 2, '0'));
};

export const isKeyForbidden = (key: number) => {
  const keyChar = String.fromCharCode(key);

  return (
    ALLOWED_DATE_CHARACTERS.test(keyChar) && ALLOWED_KEY_CODES.includes(key)
  );
};

export const shouldFocusOnPrevInput = (
  key: number,
  element: HTMLInputElement,
) => {
  const selectionStart = element.selectionStart;

  return key === KEY_CODES.leftArrow && selectionStart === 0;
};

export const shouldFocusOnNextInput = (
  key: number,
  element: HTMLInputElement,
) => {
  const selectionStart = element.selectionStart;
  const value = element.value;

  return key === KEY_CODES.rightArrow && selectionStart === value.length;
};

export const getKey = (event: KeyboardEvent) => {
  const { charCode, which } = event;
  return !charCode ? which : charCode;
};

export const isLastTimeFragment = (
  index: number,
  timeFragments: Array<string>,
) => index === timeFragments.length - 1;

export const getAriaLabel = (time: Time) =>
  `${TIME_ARIA_LABEL}: ${getTimeValue(time)}`;

export const isFragmentFilled = (
  index: number,
  value: Time,
  fragments: Array<string>,
  fragmentType: TimePart,
) =>
  index < fragments.length - 1 &&
  value[fragmentType].length === fragmentType.length;

export const getIndexOfTimeOption = (options: Array<Time>, time: Time) =>
  findIndex(options, { [HOUR_KEY]: time[HOUR_KEY] });

export const getTimeValidationObject = (time: Time) =>
  (Object.keys(time) as TimePart[]).reduce(
    (obj: ValidTime, timeFragment: TimePart) => {
      obj[timeFragment] = isTimeFragmentValid(timeFragment, time[timeFragment]);
      return obj;
    },
    {} as ValidTime,
  );

export const isTimeFragmentValid = (type: TimePart, value: string | number) => {
  if (!value) return true;

  return !(
    isNaN(value as number) ||
    !value ||
    value > TIME_INPUT_MAX_LIMITS[type]
  );
};

export const isTypedValueInvalid = (value?: string | number) => {
  if (!value) return false;

  return isNaN(value as number) || !value;
};
