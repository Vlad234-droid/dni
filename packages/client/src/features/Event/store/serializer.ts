import { normalizeImage } from 'utils/content';
import { FULL_FORMAT, isoDateToFormat } from 'utils/date';

import Event from '../config/types';

export default function (
  { id, image, startDate, endDate, ...rest }: Event = {} as Event,
): Event | undefined {
  if (!id) return;

  return {
    ...rest,
    id,
    image: normalizeImage(image),
    startDate: isoDateToFormat(startDate, FULL_FORMAT),
    endDate: isoDateToFormat(endDate, FULL_FORMAT),
  };
}
