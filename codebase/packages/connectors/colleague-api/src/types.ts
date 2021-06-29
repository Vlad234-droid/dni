import { ConnectorContext } from '@energon-connectors/core';
import { SimpleFetchOptions } from '@energon/rest-api-consumer';

export type Title = 'DR.' | 'MR.' | 'MRS.' | 'MISS';

export type BusinessType = 'Office' | 'Store' | 'BankOffice' | 'BankCS' | 'Distribution';

export type Status =
  | 'Active - Payroll Eligible'
  | 'Inactive - Payroll Eligible'
  | 'Suspended - Payroll Eligible'
  | 'On Maternity - Payroll Eligible'
  | 'Active - No Payroll'
  | 'Paid in Legacy';

export type Colleague = {
  assignmentName?: string;
  assignmentStatus?: string;
  businessType?: BusinessType;
  dateOfBirth?: string;
  departmentName?: string;
  employmentStatusType?: Status;
  firstName?: string;
  lastName?: string;
  locationUUID?: string;
  masteredInLegacy?: boolean;
  middleName?: string;
  personNumber?: string;
  positionId?: string;
  preferredName?: string;
  source?: string;
  title?: Title;
  workerType?: string;
  workLevel?: string;
};

export type ColleagueRequestBody = {
  query: string;
  variables: {
    colleagueUUID: string;
  };
  operationName: string;
};

export type GetColleagueInput<T extends keyof Colleague> = {
  colleagueUUID: string;
  fields: T[];
  fetchOpts?: SimpleFetchOptions;
};

export type ColleagueApiContext = Pick<ConnectorContext, 'identityClientToken' | 'apiEnv' | 'markApiCall'>;

export type ApiParams = {
  colleagueUUID?: string;
  'externalSystems.iam.id'?: string;
};

export type ApiInput<T, U = unknown> = {
  params: T;
  body?: U;
};

export type ColleagueList = {
  colleagues: ColleagueV2[];
};

export interface ColleagueV2 {
  colleagueUUID: string;
  employeeId?: string;
  countryCode?: string;
  effectivity?: Effectivity;
  externalSystems: ExternalSystems;
  profile: Profile;
  contact?: Contact;
  serviceDates?: ServiceDates;
  workRelationships?: WorkRelationship[];
  nonTerms?: NonTerm[];
  visaPermits?: VisaPermit[];
  skills?: Skill[];
}

export interface Contact {
  email: string;
  workPhoneNumber?: string;
  addresses?: Address[];
}

export interface Address {
  lines?: string[];
  countryCode?: string;
  postcode?: string;
  city?: string;
}

export interface Effectivity {
  from: Date;
  to: Date;
}

export interface ExternalSystems {
  sourceSystem: string;
  iam: Iam;
  hcm: Hcm;
}

export interface Hcm {
  id: number;
  name: string;
  type: string;
  migrationStatus: string;
}

export interface Iam {
  id: string;
  name: string;
  source: string;
}

export interface NonTerm {
  startDate: Date;
  endDate: Date;
}

export interface Profile {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  dateOfBirth: Date;
  gender: string;
}

export interface ServiceDates {
  hireDate: Date;
  leavingDate: Date;
}

export interface Skill {
  code: string;
  name: string;
  type: string;
}

export interface VisaPermit {
  code: string;
  name: string;
  expirationDate: Date;
}

export interface WorkRelationship {
  locationUUID: string;
  contractType: ContractType;
  colleagueType: string;
  workingStatus: string;
  type: string;
  managerUUID: string;
  actionCode: string;
  actionReasonCode: null;
  userStatus: string;
  workSchedule: string;
  employmentType: string;
  salaryFrequency: string;
  workingHours: string;
  costCenter: string;
  assignmentId: string;
  primaryEntity: string;
  workingInHiredCountry: boolean;
  isManager: boolean;
  legalEmployer: LegalEmployer;
  department: Department;
  job: Job;
  grade: Grade;
  position: Position;
}

export interface ContractType {
  sourceCode: string;
  sourceName: string;
  endDate: Date;
}

export interface Department {
  id: string;
  name: string;
  businessType: string;
}

export interface Grade {
  id: string;
  code: string;
}

export interface Job {
  id: string;
  code: string;
  name: string;
  costCategory: string;
}

export interface LegalEmployer {
  id: number;
  name: string;
}

export interface Position {
  id: string;
  name: string;
  teamName: string;
}

export type ColleagueAPIHeaders = {
  Authorization: () => string;
};
