import faker from 'faker';
import { File, Status as EntryStatus } from '@dni-connectors/colleague-cms-api';

const IMG_HEIGHT = 400;
const IMG_WIDTH = 400;

const MIME_TYPES = ['image/jpeg', 'image/png'];

const EXTS = MIME_TYPES.map(faker.system.fileExt);

export const Status = [EntryStatus.ARCHIVED, EntryStatus.PUBLISHED] as const;

export const generateFile = () => {
  const file: File = {
    id: faker.random.number(),
    alternativeText: faker.random.word(),
    caption: faker.random.word(),
    ext: faker.random.arrayElement(EXTS),
    height: IMG_HEIGHT,
    mime: faker.random.arrayElement(MIME_TYPES),
    name: faker.random.word(),
    previewUrl: faker.image.imageUrl(IMG_WIDTH / 2, IMG_HEIGHT / 2),
    size: faker.random.number(),
    url: `${faker.image.imageUrl(
      IMG_WIDTH,
      IMG_HEIGHT,
    )}?random=${faker.random.number()}`,
    width: IMG_WIDTH,
  };
  return file;
};
