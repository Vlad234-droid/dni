import { DateTime } from 'luxon';
import { buildEventCRUD } from '@dni/mock-server/src/crud';

import { isEventOnAir } from './index';

describe('#isEventOnAir', () => {
  const eventData = buildEventCRUD(1).findAll()[0];

  it('should return false, if now is equal to end and start', () => {
    expect(isEventOnAir(eventData)).toBe(false);
  });

  it('should return false, if now < start', () => {
    const newEventData = {
      ...eventData,
      startDate: DateTime.now().plus({ days: 1 }).toISO(),
      endDate: DateTime.now().plus({ days: 2 }).toISO(),
    };

    expect(isEventOnAir(newEventData)).toBe(false);
  });

  it('should return false, if now > end', () => {
    const newEventData = {
      ...eventData,
      startDate: DateTime.now().minus({ days: 2 }).toISO(),
      endDate: DateTime.now().minus({ days: 1 }).toISO(),
    };

    expect(isEventOnAir(newEventData)).toBe(false);
  });

  it('should return true, if now is in range of start and end time', () => {
    const newEventData = {
      ...eventData,
      startDate: DateTime.now().minus({ days: 1 }).toISO(),
      endDate: DateTime.now().plus({ days: 2 }).toISO(),
    };

    expect(isEventOnAir(newEventData)).toBe(true);
  });
});
