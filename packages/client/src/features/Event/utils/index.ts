import { DateTime } from 'luxon';

import { firstDayOf, lastDayOf, FULL_FORMAT } from 'utils/date';

import { Filter } from '../config/types';
import { ALL, THIS_MONTH, THIS_WEEK } from '../config/contstants';

export const isEventOnAir = (startDate: string, endDate: string) => {
  const now = DateTime.now();

  return (
    DateTime.fromFormat(startDate, FULL_FORMAT) < now &&
    DateTime.fromFormat(endDate, FULL_FORMAT) > now
  );
};

export const isActionDisabled = (
  participants?: number,
  maxParticipants?: number,
) => {
  if (!maxParticipants) return false;

  return (participants || 0) >= maxParticipants;
};

export const getPayloadWhere = (filter: Filter) => {
  let where = {};
  switch (filter) {
    case ALL: {
      where = {
        endDate_gte: new Date(),
      };
      break;
    }
    case THIS_WEEK: {
      const firstDayOfThisMonth = firstDayOf('week').toJSDate();
      const lastDayOfThisMonth = lastDayOf('week').toJSDate();
      where = {
        startDate_gte: firstDayOfThisMonth,
        startDate_lte: lastDayOfThisMonth,
      };
      break;
    }
    case THIS_MONTH: {
      const firstDayOfThisMonth = firstDayOf('month').toJSDate();
      const lastDayOfThisMonth = lastDayOf('month').toJSDate();
      where = {
        startDate_gte: firstDayOfThisMonth,
        startDate_lte: lastDayOfThisMonth,
      };
      break;
    }
  }
  return where;
};
