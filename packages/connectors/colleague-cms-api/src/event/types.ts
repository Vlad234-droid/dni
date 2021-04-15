import { DateString, File } from '../built-in';
import { Network } from '../network';
import { BaseApiParams, BaseType } from '../types';

type Event = {
  title: string;
  network: Network;
  maxParticipants: number;
  startDate: DateString;
  endDate: DateString;
  surveryUrl: string;
  description: string;
  slug: string;
  image: File | null;
} & BaseType;

type EventApiParams = {
  id: string;
} & BaseApiParams;

type EventBody = Omit<Network, 'id'>;

export type { EventApiParams, Event, EventBody };
