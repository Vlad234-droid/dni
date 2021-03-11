import {
  RANGE_INPUT_GROUP_ARIA_LABELS as DATE_LABELS,
  START_DATE,
  END_DATE,
} from '@beans/date-input';

export const TIME_ARIA_LABEL = 'Time';

export const START_TIME_OPTION = 9;
export const END_TIME_OPTION = 19;

export const TIME_FORMAT = 'hh-mm';
export const TIME_SEPARATOR = '-';
export const VISIBLE_TIME_SEPARATOR = ':';

export const HOUR_KEY = 'hh';
export const MINUTE_KEY = 'mm';

export const DEFAULT_MINUTES = '00';

export const START_TIME = 'startTime';
export const END_TIME = 'endTime';

export const TIME_FRAGMENTS_PLACEHOLDER = {
  [HOUR_KEY]: 'HH',
  [MINUTE_KEY]: 'MM',
};

export const TIME_FRAGMENT_NAMES = {
  [HOUR_KEY]: 'hour',
  [MINUTE_KEY]: 'minute',
};

export const TIME_INPUT_MAX_LIMITS = {
  [HOUR_KEY]: 23,
  [MINUTE_KEY]: 59,
};

export const DATE_ERROR_MESSAGE = 'Enter a valid date';
export const TIME_ERROR_MESSAGE = 'Enter a valid time';

export const TIME_LABELS = {
  [START_TIME]: 'Start Time',
  [END_TIME]: 'End Time',
};

export const TYPE_START = 'start';
export const TYPE_END = 'end';

export const TIME_LABEL_BY_TYPE = {
  [TYPE_START]: TIME_LABELS[START_TIME],
  [TYPE_END]: TIME_LABELS[END_TIME],
};

export const DATE_LABEL_BY_TYPE = {
  [TYPE_START]: DATE_LABELS[START_DATE],
  [TYPE_END]: DATE_LABELS[END_DATE],
};

export const TIME_NAME_BY_TYPE = {
  [TYPE_START]: START_TIME,
  [TYPE_END]: END_TIME,
};

export const DATE_NAME_BY_TYPE = {
  [TYPE_START]: START_DATE,
  [TYPE_END]: END_DATE,
};
