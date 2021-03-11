import { DateString } from '../built-in';
import { Network } from '../network';
import { User } from '../user';

type EventApiParams = {
  id: string;
};

type Status = 'accepted' | 'declined';

type Event = {
  id: number;
  title: string;
  network: Network;
  maxParticipantsCount: number;
  startDateTime: DateString;
  endDateTime: DateString;
  surveyLink: string;
  description: string;
  slug: string;
  createdBy: User;
  createAt: DateString;
  updateAt: DateString;
};

type EventUser = {
  id: number;
  event: Event;
  user: User;
  status: Status;
  createAt: DateString;
  updateAt: DateString;
};

export type { EventApiParams, Event, EventUser };
