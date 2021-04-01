import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { Network } from '@dni-connectors/colleague-cms-api';

const ROOT = 'networks';
const LIST_ACTION = `${ROOT}/list`;
const ONE_ACTION = `${ROOT}/one`;
const SET_ONE_ACTION = `${ROOT}/set_one`;
const COUNT_ACTION = `${ROOT}/count`;

const EntityAdapter = createEntityAdapter<Network>();

type State = {
  isLoading: boolean;
  error: null | string;
  meta: Meta;
} & EntityState<Network>;

type Meta = {
  count: number;
  total: number;
  page: number;
};

type ListResponse = Array<Network>;

type OneResponse = Network;

type OnePayload = {
  id: number;
};

type SetOnePayload = Network;

export type {
  State,
  Network,
  ListResponse,
  OneResponse,
  SetOnePayload,
  OnePayload,
};

export {
  EntityAdapter,
  // actions
  ROOT,
  LIST_ACTION,
  ONE_ACTION,
  SET_ONE_ACTION,
  COUNT_ACTION,
};
