import Ajv from 'ajv';

import { colleague } from './generator';

describe('Emotion generator', () => {
  const ajv = new Ajv();

  it.only('should emotion schema be valid', () => {
    const schema = {
      type: 'object',
      properties: {
        assignmentName: { type: 'string' },
        assignmentStatus: { type: 'string' },
        businessType: { type: 'string' },
        dateOfBirth: { type: 'string' },
        departmentName: { type: 'string' },
        employmentStatusType: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        locationUUID: { type: 'string' },
        masteredInLegacy: { type: 'boolean' },
        middleName: { type: 'string' },
        personNumber: { type: 'string' },
        positionId: { type: 'string' },
        preferredName: { type: 'string' },
        source: { type: 'string' },
        title: { type: 'string' },
        workLevel: { type: 'string' },
        workerType: { type: 'string' },
      },
      required: ['assignmentName', 'locationUUID', 'title'],
    };

    const valid = ajv.validate(schema, colleague);
    expect(valid).toBeTruthy();
  });
});
