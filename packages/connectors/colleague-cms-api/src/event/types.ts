import { DateString } from '../built-in';
import { Network } from '../network';
import { User } from '../user';
import { BaseApiParams, BaseType } from '../types';

type Status = 'accepted' | 'declined';

type Event = {
  title: string;
  network: Network;
  maxParticipantsCount: number;
  startDateTime: DateString;
  endDateTime: DateString;
  surveyLink: string;
  description: string;
  slug: string;
  createdBy: User;
} & BaseType;

type EventUser = {
  event: Event;
  user: User;
  status: Status;
} & BaseType;

type EventApiParams = {
  id: string;
} & BaseApiParams;

type EventBody = Omit<Network, 'id'>;

export type { EventApiParams, Event, EventUser, EventBody };
