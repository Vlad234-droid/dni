import { DateTime } from 'luxon';

import { isEventOnAir } from './index';

describe('#isEventOnAir', () => {
  it('should return false, if now is equal to end and start', () => {
    const eventData = {
      id: 1,
      title: 'mocked_title',
      image: null,
      network: 'mocked_network',
      maxParticipants: 42,
      startedAt: DateTime.now(),
      finishedAt: DateTime.now(),
    };

    expect(isEventOnAir(eventData)).toBe(false);
  });

  it('should return false, if now < start', () => {
    const eventData = {
      id: 1,
      title: 'mocked_title',
      image: null,
      network: 'mocked_network',
      maxParticipants: 42,
      startedAt: DateTime.now().plus({ days: 1 }),
      finishedAt: DateTime.now().plus({ days: 2 }),
    };

    expect(isEventOnAir(eventData)).toBe(false);
  });

  it('should return false, if now > end', () => {
    const eventData = {
      id: 1,
      title: 'mocked_title',
      image: null,
      network: 'mocked_network',
      maxParticipants: 42,
      startedAt: DateTime.now().minus({ days: 2 }),
      finishedAt: DateTime.now().minus({ days: 1 }),
    };

    expect(isEventOnAir(eventData)).toBe(false);
  });

  it('should return true, if now is in range of start and end time', () => {
    const eventData = {
      id: 1,
      title: 'mocked_title',
      image: null,
      network: 'mocked_network',
      maxParticipants: 42,
      startedAt: DateTime.now().minus({ days: 1 }),
      finishedAt: DateTime.now().plus({ days: 2 }),
    };

    expect(isEventOnAir(eventData)).toBe(true);
  });
});
