import { DateObjectUnits } from 'luxon';

export const isEndValueValid = (
  start?: DateObjectUnits,
  end?: DateObjectUnits,
) => {
  if (!start || !end) return true;

  return end > start;
};
