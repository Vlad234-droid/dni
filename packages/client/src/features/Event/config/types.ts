import { Event } from '@dni-connectors/colleague-cms-api';

import { EntityState } from '@reduxjs/toolkit';

import { Loading } from 'store/types';

// TODO: #is not it common?
type State = {
  loading: Loading;
  error: null | string;
  meta: Meta;
  participants: Record<number, number>;
} & EntityState<Event>;

// TODO: #is not it common?
type Meta = {
  count: number;
  total: number;
  page: number;
  pageCount: number;
};

// TODO: #why general names?
type ListResponse = Array<Event>;

type OneResponse = Event;
type OneImageResponse = Event['image'];

type OnePayload = {
  id: number;
};

type SetOnePayload = Event;

// TODO: #common?
type UploadImgPayload = {
  id: number;
  image: File;
};

const ALL = 'ALL';
const THIS_WEEK = 'THIS_WEEK';
const THIS_MONTH = 'THIS_MONTH';

type Filter = typeof ALL | typeof THIS_WEEK | typeof THIS_MONTH;

export { ALL, THIS_WEEK, THIS_MONTH };

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
};

export default Event;
