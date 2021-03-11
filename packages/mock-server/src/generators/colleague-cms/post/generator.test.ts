import Ajv from 'ajv';

import { post, poster } from './generator';

describe('Post generator', () => {
  const ajv = new Ajv();

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
        createAt: { type: 'string' },
        updateAt: { type: 'string' },
      },
      required: [
        'id',
        'title',
        'description',
        'postAs',
        'sharedToken',
        'createdBy',
        'createAt',
        'updateAt',
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
