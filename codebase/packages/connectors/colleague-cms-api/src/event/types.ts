import { DateString, File } from '../built-in';
import { Network } from '../network';
import { BaseApiParams, BaseType } from '../types';

type Event = {
  title: string;
  network: Network;
  maxParticipants: number;
  startDate: DateString;
  endDate: DateString;
  surveryUrl?: string;
  description: string;
  slug: string;
  image?: File;
} & BaseType;

type EventApiParams = {
  id: string;
  startDate_lte?: string;
  startDate_gte?: string;
  startDate_lgte?: string;
  endDate_gte?: string;
  endDate_lt?: string;
  network_eq?: string;
} & BaseApiParams;

type EventBody = Omit<Network, 'id'>;

export type { EventApiParams, Event, EventBody };