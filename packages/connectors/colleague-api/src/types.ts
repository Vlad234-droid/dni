import { ConnectorContext } from '@energon-connectors/core';
import { SimpleFetchOptions } from '@energon/rest-api-consumer';

export type Title = 'DR.' | 'MR.' | 'MRS.' | 'MISS';

export type BusinessType =
  | 'Office'
  | 'Store'
  | 'BankOffice'
  | 'BankCS'
  | 'Distribution';

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

export type ColleagueApiContext = Pick<
  ConnectorContext,
  'identityUserToken' | 'apiEnv' | 'markApiCall'
>;
