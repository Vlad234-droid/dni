import * as A from '@energon/array-utils';
import { DateTime, UTCdateFromDayTime, UTCdateToDayTime } from '@energon/date-utils';

const ISODateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/gm;

type QueryEntryValue = string | boolean | number | DateTime | undefined;

type Query = { [key: string]: QueryEntryValue };

export const querySerializer = {
  parse: (query: string): Query => {
    const queryObject = {} as any;

    new URLSearchParams(decodeURIComponent(query)).forEach((value, key) => {
      queryObject[key] = parseQueryValue(value);
    });

    return queryObject;
  },
  stringify: (query: Query): string => {
    const entries = A.compactMap(([key, value]) => {
      if (value == null) return undefined;

      return [
        key,
        typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
          ? value.toString()
          : UTCdateFromDayTime(value).toISOString(),
      ];
    }, Object.entries(query));

    return new URLSearchParams(entries).toString();
  },
};

export const parseQueryValue = (value: string) => {
  const parsedNumber = Number(value);

  if (value.match(ISODateFormat)) {
    return UTCdateToDayTime(new Date(value));
  } else if (value === '') {
    return '';
  } else if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (!isNaN(parsedNumber)) {
    return parsedNumber;
  } else {
    return value;
  }
};
