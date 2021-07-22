import { ConnectorContext } from '@energon-connectors/core';

export type Title = 'DR.' | 'MR.' | 'MRS.' | 'MISS';

export type BusinessType = 'Office' | 'Store' | 'BankOffice' | 'BankCS' | 'Distribution';

export type Status =
  | 'Active - Payroll Eligible'
  | 'Inactive - Payroll Eligible'
  | 'Suspended - Payroll Eligible'
  | 'On Maternity - Payroll Eligible'
  | 'Active - No Payroll'
  | 'Paid in Legacy';

export type ColleagueRequestParams = {
  colleagueUUID: string;
  effectiveOn?: string;
};

export type ColleagueListRequestParams = Partial<{
  colleagueUUID: string;
  employeeId: string;
  'workRelationships.locationUUID': string;
  'externalSystems.iam.id': string;
  'externalSystems.hcm.id': string;
  countryCode: string;
  'externalSystems.sourceSystem': string;
  'workRelationships.managerUUID': string;
}>;

export interface Colleague {
  colleagueUUID: string;
  employeeId?: string;
  countryCode?: string;
  effectivity?: {
    from: Date;
    to: Date;
  };
  externalSystems: {
    sourceSystem?: string;
    iam?: {
      id: string;
      name?: string;
      source?: string;
    };
    hcm?: {
      id: number;
      name?: string;
      type?: string;
      migrationStatus?: string;
    };
  };
  profile: {
    title?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    preferredName?: string;
    dateOfBirth: Date;
    gender?: string;
  };
  contact?: {
    email: string;
    workPhoneNumber?: string;
    addresses?: Address[];
  };
  serviceDates?: {
    hireDate: Date;
    leavingDate?: Date;
  };
  workRelationships?: WorkRelationship[];
  nonTerms?: NonTerm[];
  visaPermits?: VisaPermit[];
  skills?: Skill[];
}

export type ColleagueList = {
  colleagues: Colleague[];
};

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

export interface NonTerm {
  startDate: Date;
  endDate: Date;
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
  contractType?: {
    sourceCode: string;
    sourceName: string;
    endDate: Date;
  };
  colleagueType?: string;
  workingStatus?: string;
  type?: string;
  managerUUID?: string;
  actionCode?: string;
  actionReasonCode?: null;
  userStatus?: string;
  workSchedule?: string;
  employmentType?: string;
  salaryFrequency?: string;
  workingHours?: string;
  costCenter?: string;
  assignmentId?: string;
  primaryEntity?: string;
  workingInHiredCountry?: boolean;
  isManager?: boolean;
  legalEmployer?: {
    id: number;
    name: string;
  };
  department: {
    id?: string;
    name?: string;
    businessType: string;
  };
  job?: {
    id: string;
    code: string;
    name: string;
    costCategory: string;
  };
  grade?: {
    id: string;
    code: string;
  };
  position?: {
    id: string;
    name: string;
    teamName: string;
  };
}

export type ColleagueAPIHeaders = {
  Authorization: () => string;
};
