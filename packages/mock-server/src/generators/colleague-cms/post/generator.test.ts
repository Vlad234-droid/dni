import Ajv from 'ajv';

import { generatePost } from './generator';

describe('Post generator', () => {
  const ajv = new Ajv();
  const post = generatePost();

  it.only('should post schema be valid', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        attachments: { type: 'array' },
        description: { type: 'string' },
        slug: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
      required: ['id', 'title', 'created_at', 'updated_at'],
    };

    const valid = ajv.validate(schema, post);
    expect(valid).toBeTruthy();
  });
});
