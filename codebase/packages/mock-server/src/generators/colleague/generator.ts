import faker from 'faker';
import { Colleague } from '@dni-connectors/colleague-api';

import { dateToFormat, DATE_FORMAT } from 'utils/date';

const BusinessType = [
  'Office',
  'Store',
  'BankOffice',
  'BankCS',
  'Distribution',
] as const;

const Status = [
  'Active - Payroll Eligible',
  'Inactive - Payroll Eligible',
  'Suspended - Payroll Eligible',
  'On Maternity - Payroll Eligible',
  'Active - No Payroll',
  'Paid in Legacy',
] as const;

const Title = ['DR.', 'MR.', 'MRS.', 'MISS'] as const;

export const colleague: Colleague = {
  assignmentName: faker.name.findName(),
  assignmentStatus: 'ACTIVE',
  businessType: faker.random.arrayElement(
    BusinessType,
  ) as Colleague['businessType'],
  dateOfBirth: dateToFormat(faker.date.past(1990), DATE_FORMAT),
  departmentName: faker.commerce.department(),
  employmentStatusType: faker.random.arrayElement(
    Status,
  ) as Colleague['employmentStatusType'],
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  locationUUID: faker.datatype.uuid(),
  masteredInLegacy: faker.datatype.boolean(),
  middleName: faker.name.middleName(),
  personNumber: faker.datatype.number().toString(),
  positionId: faker.datatype.number().toString(),
  preferredName: faker.name.firstName(),
  source: 'HCM',
  title: faker.random.arrayElement(Title) as Colleague['title'],
  workLevel: 'T',
  workerType: 'E',
};
