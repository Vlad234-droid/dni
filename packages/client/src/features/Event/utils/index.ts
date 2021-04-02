import { DateTime } from 'luxon';

import Event from '../config/types';

export const isEventOnAir = (event: Event) => {
  const now = DateTime.now();

  return event.startedAt < now && event.finishedAt > now;
};
