import Ajv from 'ajv';

import { generateEmotion } from './generator';

describe('Emotion generator', () => {
  const ajv = new Ajv();

  it.only('should emotion schema be valid', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        count: { type: 'number' },
      },
      required: ['id', 'count'],
    };

    const valid = ajv.validate(schema, generateEmotion());
    expect(valid).toBeTruthy();
  });
});
