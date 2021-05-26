import { REACT_APP_CONTENT_URL } from 'config/content';
import { File } from '@dni-connectors/colleague-cms-api';

const buildAbsolutePath = (path: string) =>
  path.charAt(0) === '/' ? `${REACT_APP_CONTENT_URL}${path}` : path;

const normalizeImage = (image: File | null | undefined) => {
  if (!image) {
    return;
  }

  return {
    ...image,
    alternativeText: image.alternativeText,
    url: buildAbsolutePath(image.url),
  };
};

export { normalizeImage, buildAbsolutePath };
