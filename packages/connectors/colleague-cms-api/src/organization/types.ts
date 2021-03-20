import { File } from '../built-in';
import { BaseApiParams, BaseType } from '../types';

type Organization = {
  title: string;
  link: string;
  image: File | null;
} & BaseType;

type OrganizationBody = Omit<Organization, 'id'>;

type OrganizationApiParams = {
  id: string;
} & BaseApiParams;

export type { Organization, OrganizationApiParams, OrganizationBody };
