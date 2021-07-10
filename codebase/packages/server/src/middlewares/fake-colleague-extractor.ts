import { createOrUpdateDniUser, infoExtractor } from '../services/employee';
import { ColleagueV2 } from '@dni-connectors/colleague-api';

export const fakeColleagueExtractor: Middleware = async (req, res, next) => {
  const userInfo = infoExtractor(req, res);
  const colleagueUUID = '213ea7d6-1d3e-4429-8a2d-8007d6c11731';
  const colleague = {
    colleagueUUID,
    externalSystems: {
      iam: {
        id: userInfo?.params?.employeeNumber,
        name: 'IAM',
      },
    },
    profile: {
      firstName: 'Fake',
      lastName: 'User',
      dateOfBirth: '1947-09-19',
      gender: 'M',
    },
    contact: {
      addresses: [
        {
          lines: ['Station', 'Road'],
          countryCode: 'GB',
          postcode: 'CV47 9QL',
          city: 'Long Itchington',
        },
      ],
    },
    serviceDates: {
      hireDate: '2020-08-12',
      leavingDate: '2021-12-31',
    },
    workRelationships: [
      {
        locationUUID: '25497e26-2209-499d-b12a-8411c217f21e',
        department: {
          businessType: 'Office',
        },
      },
    ],
  } as unknown as ColleagueV2;

  await createOrUpdateDniUser(colleague);

  req.colleagueUUID = colleagueUUID;

  next();
};
