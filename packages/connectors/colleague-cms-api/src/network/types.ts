import { File } from '../built-in';
import { User } from '../user';
import { Organization } from '../organization';
import { Question } from '../question';
import { BaseApiParams, BaseType } from '../types';

type Status = 'archived' | 'published';
type NetworkUserStatus = 'joined' | 'left';

type Network = {
  title: string;
  slug: string;
  description: string;
  parent: Network | null;
  image: File | null;
  managerEmail: string;
  managers: User[];
  partnerships: Organization[];
  status: Status;
  isPublished: boolean;
  children?: Network[];
  questions?: Question[];
  createdBy: User;
} & BaseType;

type NetworkUser = {
  network: Network;
  user: User;
  status: NetworkUserStatus;
} & BaseType;

type NetworkApiParams = {
  id: string;
} & BaseApiParams;

type NetworkBody = Omit<Network, 'id'>;

export type { NetworkApiParams, Network, NetworkUser, NetworkBody };
