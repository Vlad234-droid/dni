import { Event } from '../event';

import { File } from '../built-in';
import { Organization } from '../organization';
import { BaseApiParams, BaseType } from '../types';

export type Network = {
  title: string;
  slug: string;
  description: string;
  image?: File | null;
  contact: string;
  partners?: Organization[];
  events: Event[];
} & BaseType;

export type NetworkApiParams = {
  id: string;
  id_in?: string[];
} & BaseApiParams;

export type NetworkBody = Omit<Network, 'id'>;

export default Network;
