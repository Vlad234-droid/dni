import Ajv from 'ajv';

import { generatePost, poster } from './generator';

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
        postAs: { type: 'object' },
        sharedToken: { type: 'string' },
        slug: { type: 'string' },
        status: { type: 'string' },
        emotions: { type: 'array' },
        createdBy: { type: 'object' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
      required: [
        'id',
        'title',
        'postAs',
        'sharedToken',
        'createdBy',
        'created_at',
        'updated_at',
      ],
    };

    const valid = ajv.validate(schema, post);
    expect(valid).toBeTruthy();
  });

  it.only('should poster schema be valid', () => {
    const schema = {
      type: 'object',
      properties: {
        __component: { type: 'string' },
        user: { type: 'object' },
      },
      required: ['__component', 'user'],
    };

    const valid = ajv.validate(schema, poster);
    expect(valid).toBeTruthy();
  });
});
