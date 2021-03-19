import { File } from '../built-in';
import { BaseApiParams } from '../types';

type Organization = {
  id: number;
  title: string;
  link: string;
  image: File | null;
};

type OrganizationBody = Omit<Organization, 'id'>;

type OrganizationApiParams = {
  id: string;
} & BaseApiParams;

export type { Organization, OrganizationApiParams, OrganizationBody };
