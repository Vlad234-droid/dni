import { EntityState } from '@reduxjs/toolkit';
import { Network } from '@dni-connectors/colleague-cms-api';

import Loading from 'types/loading';
import { ALL, YOUR_NETWORKS } from './filters';

interface FormData {
  image?: File;
  title: string;
  email: string;
  manager: string;
  description?: string;
  partnership?: Array<string | undefined>;
}

type Names = keyof FormData;

type Participant = {
  id: number;
  participants: number;
};

type ParticipantsResponse = Participant[];

type State = {
  loading: Loading;
  error?: string;
  meta: Meta;
  participants: Participants;
} & EntityState<Network>;

type Meta = {
  loading: Loading;
  error?: string;
  count: number;
  total: number;
  page: number;
};

type Participants = {
  loading: Loading;
  error?: string;
  data: Record<number, number>;
};

type ListResponse = Array<Network>;

type OneResponse = Network;

type OnePayload = {
  id: number;
};

type SetOnePayload = Network;

type Filter = typeof ALL | typeof YOUR_NETWORKS;

interface Filters {
  id_in?: number[];
}

export type {
  State,
  Network,
  ListResponse,
  OneResponse,
  SetOnePayload,
  OnePayload,
  FormData,
  Names,
  Filter,
  ParticipantsResponse,
  Filters,
};

export default Network;
