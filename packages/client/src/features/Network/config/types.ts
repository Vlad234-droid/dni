import { EntityState } from '@reduxjs/toolkit';
import { Network } from '@dni-connectors/colleague-cms-api';

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
  isLoading: boolean;
  error: null | string;
  meta: Meta;
  participants: Record<number, number>;
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

const ALL = 'ALL';
const YOUR_NETWORKS = 'YOUR_NETWORKS';

type Filter = typeof ALL | typeof YOUR_NETWORKS;

export { ALL, YOUR_NETWORKS };
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
};

export default Network;
