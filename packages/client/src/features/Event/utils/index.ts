import { DateTime } from 'luxon';

import Event from '../config/types';

export const isEventOnAir = (event: Event) => {
  const now = DateTime.now();

  return event.startDate < now && event.endDate > now;
};
