import { DateBase, Time, Period, UTCdateFromDayTime } from '@energon/date-utils';

export const toDateTestString = (date: DateBase & Partial<Time>) => UTCdateFromDayTime(date).toISOString();

type ShiftData = Period & { type: string };

export const shiftTestID = (shift: ShiftData): string =>
  `shift-${shift.type}-${toDateTestString(shift.start)}-${toDateTestString(shift.end)}`;

export const shiftPlaceholderTestID = (shift: ShiftData): string =>
  `shift-placeholder-${shift.type}-${toDateTestString(shift.start)}-${toDateTestString(shift.end)}`;

export const booleanTestID = (name: string, value: boolean) => `${name}${value ? 'On' : 'Off'}`;
