import faker from 'faker';

import { Colleague } from '@dni-connectors/colleague-api';

const BusinessType = ['Office', 'Store', 'BankOffice', 'BankCS', 'Distribution'] as const;

export const Status = [
  'Active - Payroll Eligible',
  'Inactive - Payroll Eligible',
  'Suspended - Payroll Eligible',
  'On Maternity - Payroll Eligible',
  'Active - No Payroll',
  'Paid in Legacy',
] as const;

export const Title = ['DR.', 'MR.', 'MRS.', 'MISS'] as const;

export const colleague: Colleague = {
  colleagueUUID: faker.datatype.uuid(),
  externalSystems: {
    iam: {
      id: `UK${faker.datatype.number({ min: 10000000, max: 99999999 })}`,
      name: 'IAM',
    },
  },
  profile: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dateOfBirth: faker.date.past(30),
    gender: faker.random.arrayElement(['M', 'F']),
  },
  contact: {
    email: faker.internet.email(),
    addresses: [
      {
        city: faker.address.city(),
        countryCode: faker.address.countryCode(),
        postcode: faker.address.zipCode(),
      },
    ],
  },
  serviceDates: {
    hireDate: faker.date.past(10),
  },
  workRelationships: [
    {
      locationUUID: faker.datatype.uuid(),
      department: {
        businessType: faker.random.arrayElement(BusinessType),
      },
    },
  ],
};
