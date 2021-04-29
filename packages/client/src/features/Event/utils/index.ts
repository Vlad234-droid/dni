import { DateTime } from 'luxon';

export const isEventOnAir = (startDate: string, endDate: string) => {
  const now = DateTime.now();

  return DateTime.fromISO(startDate) < now && DateTime.fromISO(endDate) > now;
};
