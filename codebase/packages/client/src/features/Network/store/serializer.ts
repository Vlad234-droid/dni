import { normalizeImage } from 'utils/content';

import Network from '../config/types';

export default function (
  { id, image, partners, ...rest }: Network = {} as Network,
): Network | undefined {
  if (!id) return;

  return {
    ...rest,
    id,
    image: normalizeImage(image),
    partners: partners?.map(({ image, ...rest }) => ({
      ...rest,
      image: normalizeImage(image),
    })),
  };
}
