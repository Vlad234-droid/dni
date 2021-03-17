import { DateTime as LuxonDateTime } from 'luxon';

import { isEndValueValid } from './index';

describe('#RangeDateTimePicker utils', () => {
  describe('isEndValueValid', () => {
    const start = LuxonDateTime.fromObject({
      month: 12,
      day: 5,
      year: 2020,
      hour: 12,
      minute: 10,
    });

    it('should return true, if no start value provided', () => {
      const end = LuxonDateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 10,
      });

      expect(isEndValueValid(undefined, end)).toBe(true);
    });

    it('should return true, if no end value provided', () => {
      expect(isEndValueValid(start, undefined)).toBe(true);
    });

    it('should return true, if no end > start', () => {
      const end = LuxonDateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 15,
      });

      expect(isEndValueValid(start, end)).toBe(true);
    });

    it('should return false, if no end is equal to start', () => {
      const end = LuxonDateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 10,
      });

      expect(isEndValueValid(start, end)).toBe(false);
    });

    it('should return false, if no end < start', () => {
      const end = LuxonDateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 5,
      });

      expect(isEndValueValid(start, end)).toBe(false);
    });
  });
});
