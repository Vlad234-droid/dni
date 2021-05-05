import { DateTime } from 'luxon';
import { buildEventCRUD } from '@dni/mock-server/src/crud';

import { isEventOnAir, isActionDisabled } from './index';

describe('utils', () => {
  describe('#isEventOnAir', () => {
    const { startDate, endDate } = buildEventCRUD(1).findAll()[0];

    it('should return false, if now is equal to end and start', () => {
      expect(isEventOnAir(startDate, endDate)).toBe(false);
    });

    it('should return false, if now < start', () => {
      const startDate = DateTime.now().plus({ days: 1 }).toISO();
      const endDate = DateTime.now().plus({ days: 2 }).toISO();

      expect(isEventOnAir(startDate, endDate)).toBe(false);
    });

    it('should return false, if now > end', () => {
      const startDate = DateTime.now().minus({ days: 2 }).toISO();
      const endDate = DateTime.now().minus({ days: 1 }).toISO();

      expect(isEventOnAir(startDate, endDate)).toBe(false);
    });

    it('should return true, if now is in range of start and end time', () => {
      const startDate = DateTime.now().minus({ days: 1 }).toISO();
      const endDate = DateTime.now().plus({ days: 2 }).toISO();

      expect(isEventOnAir(startDate, endDate)).toBe(true);
    });
  });

  describe('#isActionDisabled', () => {
    it('should return false, if maxParticipants is 0', () => {
      expect(isActionDisabled(3, 0)).toBe(false);
    });

    it('should return false, if !maxParticipants', () => {
      expect(isActionDisabled(3)).toBe(false);
    });

    it('should return false, if !participants', () => {
      expect(isActionDisabled(undefined, 3)).toBe(false);
    });

    it('should return false, if participants < maxParticipants', () => {
      expect(isActionDisabled(2, 3)).toBe(false);
    });

    it('should return true, if participants === maxParticipants', () => {
      expect(isActionDisabled(3, 3)).toBe(true);
    });

    it('should return true, if participants > maxParticipants', () => {
      expect(isActionDisabled(4, 3)).toBe(true);
    });
  });
});
