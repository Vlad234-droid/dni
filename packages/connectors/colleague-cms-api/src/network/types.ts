import { File } from '../built-in';
import { Organization } from '../organization';
import { Question } from '../question';
import { BaseApiParams, BaseType } from '../types';

type Network = {
  title: string;
  slug: string;
  description: string;
  image: File | null;
  contact: string;
  partners: Organization[];
  questions?: Question[];
} & BaseType;

type NetworkApiParams = {
  id: string;
} & BaseApiParams;

type NetworkBody = Omit<Network, 'id'>;

export type { NetworkApiParams, Network, NetworkBody };
