import mockdate from 'mockdate';

import {
  dateToFormat,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
} from './date';

describe('Date utils', () => {
  beforeAll(() => {
    mockdate.set('2021-08-11 13:12:21');
  });

  afterAll(() => {
    mockdate.reset();
  });

  it('should return string in the right date format', () => {
    expect(dateToFormat(new Date(), DATE_FORMAT)).toEqual('2021-08-11');
  });

  it('should return string in the right date time format', () => {
    expect(dateToFormat(new Date(), TIME_FORMAT)).toEqual('13:12');
  });

  it('should return string in the right date with time format', () => {
    expect(dateToFormat(new Date(), DATE_TIME_FORMAT)).toEqual(
      '2021-08-11 13:12',
    );
  });
});
