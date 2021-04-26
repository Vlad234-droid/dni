import { DateTime } from 'luxon';

import Event from '../config/types';

export const isEventOnAir = (event: Event) => {
  const now = DateTime.now();

  return (
    DateTime.fromISO(event.startDate) < now &&
    DateTime.fromISO(event.endDate) > now
  );
};
