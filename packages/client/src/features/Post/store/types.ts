import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';

import { Post } from '../config/types';

const ROOT = 'posts';
const LIST_ACTION = `${ROOT}/list`;
const ONE_ACTION = `${ROOT}/one`;
const SET_ONE_ACTION = `${ROOT}/set_one`;
const COUNT_ACTION = `${ROOT}/count`;

const EntityAdapter = createEntityAdapter<Post>();

type State = {
  isLoading: boolean;
  error: null | string;
  meta: Meta;
} & EntityState<Post>;

type Meta = {
  count: number;
  total: number;
  page: number;
};

type ListResponse = Array<Post>;

type OneResponse = Post;

type OnePayload = {
  id: number;
};

type SetOnePayload = Post;

export type {
  State,
  Post,
  ListResponse,
  OneResponse,
  SetOnePayload,
  OnePayload,
};

export {
  EntityAdapter,
  ROOT,
  LIST_ACTION,
  ONE_ACTION,
  SET_ONE_ACTION,
  COUNT_ACTION,
};
