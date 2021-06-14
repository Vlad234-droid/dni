import Ajv from 'ajv';

import { generateFile } from './generator';

describe('Build-in generator', () => {
  const ajv = new Ajv();

  it.only('should file schema be valid', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        alternativeText: { type: 'string' },
        caption: { type: 'string' },
        ext: { type: 'string' },
        mime: { type: 'string' },
        name: { type: 'string' },
        previewUrl: { type: 'string' },
        height: { type: 'number' },
        width: { type: 'number' },
        size: { type: 'number' },
        url: { type: 'string' },
      },
      required: [
        'id',
        'alternativeText',
        'caption',
        'ext',
        'mime',
        'name',
        'previewUrl',
        'height',
        'width',
        'size',
        'url',
      ],
    };

    const valid = ajv.validate(schema, generateFile());
    expect(valid).toBeTruthy();
  });
});
