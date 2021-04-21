import { EntityState } from '@reduxjs/toolkit';
import { Event } from '@dni-connectors/colleague-cms-api';

// TODO: #is not it common?
type State = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | string;
  meta: Meta;
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

type UploadImgPayload = {
  id: number;
  image: File;
};

export type {
  State,
  Event,
  ListResponse,
  OneResponse,
  SetOnePayload,
  OnePayload,
  UploadImgPayload,
  OneImageResponse,
};
