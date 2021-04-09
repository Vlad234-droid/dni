import { DateString, File, Status } from '../built-in';
import { Network } from '../network';
import { User } from '../user';
import { BaseApiParams, BaseType } from '../types';

type Event = {
  title: string;
  network: Network;
  maxParticipants: number;
  startedAt: DateString;
  finishedAt: DateString;
  surveyLink: string;
  description: string;
  slug: string;
  createdBy: User;
  image: File | null;
  status: Status;
} & BaseType;

type UserStatus = 'accepted' | 'declined';

type EventUser = {
  event: Event;
  user: User;
  status: UserStatus;
} & BaseType;

type EventApiParams = {
  id: string;
} & BaseApiParams;

type EventBody = Omit<Network, 'id'>;

export type { EventApiParams, Event, EventUser, EventBody };
