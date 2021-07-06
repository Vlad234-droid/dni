import { File } from '../built-in';
import { BaseApiParams, BaseType } from '../types';

export type Organization = {
  title: string;
  contact: string;
  image?: File | null;
} & BaseType;

export type OrganizationApiParams = {
  id: string;
} & BaseApiParams;

export type OrganizationBody = Omit<Organization, 'id'>;

export default Organization;
