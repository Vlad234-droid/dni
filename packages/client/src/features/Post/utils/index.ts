import { Filter } from '../config/types';
import { BY_EVENT, BY_NETWORK } from '../config/constants';

interface CutStringProps {
  name: string;
  format: string;
  maxLength: number;
  dots?: string;
}

const cutString = ({
  name,
  maxLength,
  format,
  dots = '..',
}: CutStringProps) => {
  if (name.length > maxLength) {
    return `${name.slice(
      0,
      maxLength - format.length - dots.length,
    )}${dots}${format}`;
  }

  return name;
};

const getAllFilterPayload = (networks?: number[], events?: number[]) => ({
  _publicationState: 'preview',
  _where: {
    _or: [
      { event_null: true, network_null: true }, // public posts
      { network_in: networks }, // posts for networks to which the user is subscribed
      { event_in: events }, // posts for events to which the user is subscribed
      { event_in: events, network_in: networks }, // posts for events and networks to which the user is subscribed
    ],
  },
});

const getFilterPayload = (filter: Filter, entityId?: number) => {
  let filtersPayload = {};

  switch (filter) {
    case BY_EVENT: {
      filtersPayload = { event_eq: entityId, archived: false };
      break;
    }
    case BY_NETWORK: {
      filtersPayload = { network_eq: entityId };
      break;
    }
  }

  return filtersPayload;
};

export { cutString, getAllFilterPayload, getFilterPayload };
