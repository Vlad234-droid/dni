import Ajv from 'ajv';

import { emotion } from './generator';

describe('Emotion generator', () => {
  const ajv = new Ajv();

  it.only('should emotion schema be valid', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        count: { type: 'number' },
        image: { type: 'object' },
      },
      required: ['id', 'count', 'image'],
    };

    const valid = ajv.validate(schema, emotion);
    expect(valid).toBeTruthy();
  });
});
