import faker from 'faker';
import { File } from '@dni-connectors/colleague-cms-api';

const IMG_HEIGHT = 400;
const IMG_WIDTH = 400;

const MIME_TYPES = ['image/jpeg', 'image/png'];

const EXTS = MIME_TYPES.map(faker.system.fileExt);

export const generateFile = (url = '') => {
  const file: File = {
    id: faker.datatype.number(),
    alternativeText: faker.random.word(),
    caption: faker.random.word(),
    ext: faker.random.arrayElement(EXTS),
    height: IMG_HEIGHT,
    mime: faker.random.arrayElement(MIME_TYPES),
    name: faker.random.word(),
    previewUrl: url || faker.image.imageUrl(IMG_WIDTH / 2, IMG_HEIGHT / 2),
    size: faker.datatype.number(),
    url:
      url ||
      `${faker.image.imageUrl(
        IMG_WIDTH,
        IMG_HEIGHT,
      )}?random=${faker.datatype.number()}`,
    width: IMG_WIDTH,
  };
  return file;
};
