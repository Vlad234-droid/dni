import { Event } from '@dni-connectors/colleague-cms-api';
import { EntityState } from '@reduxjs/toolkit';

import Loading from 'types/loading';

import { ALL, THIS_WEEK, THIS_MONTH } from './contstants';

type State = {
  data: Event | {};
  loading: Loading;
  error?: string;
  meta: Meta;
  participants: Participants;
} & EntityState<Event>;

type Meta = {
  loading: Loading;
  error?: string;
  count: number;
  total: number;
  page: number;
  pageCount: number;
};

type Participants = {
  loading: Loading;
  error?: string;
  data: Record<number, number>;
};

type ListResponse = Array<Event>;

type OneResponse = Event;
type OneImageResponse = Event['image'];

type OnePayload = {
  id: number;
};

type SetOnePayload = Event;

type UploadImgPayload = {
  id: number;
  image: File;
};

type Filter = typeof ALL | typeof THIS_WEEK | typeof THIS_MONTH;

type Participant = {
  id: number;
  participants: number;
};

type ParticipantsResponse = Participant[];

export type {
  State,
  ListResponse,
  OneResponse,
  SetOnePayload,
  OnePayload,
  UploadImgPayload,
  OneImageResponse,
  Filter,
  ParticipantsResponse,
  Participants,
};

export default Event;
