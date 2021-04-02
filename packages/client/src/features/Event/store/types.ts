import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { Event } from '@dni-connectors/colleague-cms-api';

const ROOT = 'events';
const LIST_ACTION = `${ROOT}/list`;
const ONE_ACTION = `${ROOT}/one`;
const SET_ONE_ACTION = `${ROOT}/set_one`;
const UPLOAD_IMG_ACTION = `${ROOT}/upload_img`;
const COUNT_ACTION = `${ROOT}/count`;

const EntityAdapter = createEntityAdapter<Event>();

type State = {
  isLoading: boolean;
  error: null | string;
  meta: Meta;
} & EntityState<Event>;

type Meta = {
  count: number;
  total: number;
  page: number;
  pageCount: number;
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

export {
  EntityAdapter,
  // actions
  ROOT,
  LIST_ACTION,
  ONE_ACTION,
  SET_ONE_ACTION,
  UPLOAD_IMG_ACTION,
  COUNT_ACTION,
};
