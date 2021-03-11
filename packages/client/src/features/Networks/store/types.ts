import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';

const ROOT = 'networks';
const LIST_ACTION = `${ROOT}/list`;
const ONE_ACTION = `${ROOT}/one`;
const SET_ONE_ACTION = `${ROOT}/set_one`;

export type Network = {
  id: number;
  title: string;
  description?: string;
};

const EntityAdapter = createEntityAdapter<Network>();

export type State = {
  isLoading: boolean;
  error: null | string;
  meta: Meta;
} & EntityState<Network>;

type Meta = {
  count: number;
  total: number;
  page: number;
  pageCount: number;
};

export type ListResponse = {
  data: Array<Network>;
  count: number;
  total: number;
  page: number;
  pageCount: number;
};

export type OneResponse = Network;

export type OnePayload = {
  id: number;
};

export type SetOnePayload = {
  data: Network;
};

export {
  EntityAdapter,
  // actions
  ROOT,
  LIST_ACTION,
  ONE_ACTION,
  SET_ONE_ACTION,
};
