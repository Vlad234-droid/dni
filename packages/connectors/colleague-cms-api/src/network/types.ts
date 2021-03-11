import { File, DateString } from '../built-in';
import { User } from '../user';
import { Organization } from '../organization';
import { Question } from '../question';

type NetworkApiParams = {
  id: string;
};

type Status = 'archived' | 'published';
type NetworkUserStatus = 'joined' | 'left';

type Network = {
  id: number;
  title: string;
  slug: string;
  description: string;
  parent: Network | null;
  image: File | null;
  networkEmail: string;
  managers: User[];
  partnerships: Organization[];
  status: Status;
  isPublished: boolean;
  children?: Network[];
  questions?: Question[];
  createdBy: User;
  createAt: DateString;
  updateAt: DateString;
};

type NetworkUser = {
  id: number;
  network: Network;
  user: User;
  status: NetworkUserStatus;
  createAt: DateString;
  updateAt: DateString;
};

export type { NetworkApiParams, Network, NetworkUser };
