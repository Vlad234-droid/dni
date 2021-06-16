import { Event } from '@dni-connectors/colleague-cms-api';

import { File } from '../built-in';
import { Organization } from '../organization';
import { Question } from '../question';
import { BaseApiParams, BaseType } from '../types';

type Network = {
  title: string;
  slug: string;
  description: string;
  image?: File | null;
  contact: string;
  partners?: Organization[];
  questions?: Question[];
  events: Event[];
} & BaseType;

type NetworkApiParams = {
  id: string;
  id_in?: string[];
} & BaseApiParams;

type NetworkBody = Omit<Network, 'id'>;

export type { NetworkApiParams, Network, NetworkBody };
