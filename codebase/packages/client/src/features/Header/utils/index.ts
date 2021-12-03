import { now } from 'utils/date';

export const isNextYear = () => {
  const newYearDate = new Date('2022-01-01T00:00:00');

  return now() > newYearDate;
};
