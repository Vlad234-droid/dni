import { Page } from 'features/Page';

import imageUpdate0 from '../assets/image-update-0.png';
import imageUpdate1 from '../assets/image-update-1.png';
import imageUpdate2 from '../assets/image-update-2.png';
import imageUpdate3 from '../assets/image-update-3.png';
import imageUpdate4 from '../assets/image-update-4.png';
import { Update } from './types';

export const items: Update[] = [
  {
    imageSrc: imageUpdate0,
    name: 'BAME at Tesco',
    page: `${Page.NETWORKS}/bame`,
    count: 1,
  },
  {
    imageSrc: imageUpdate1,
    name: 'LGBTQ+',
    page: `${Page.NETWORKS}/lgbt`,
    count: 2,
  },
  {
    imageSrc: imageUpdate2,
    name: 'Armed forces at Tesco',
    page: `${Page.NETWORKS}/armed-forces`,
    count: 4,
  },
  {
    imageSrc: imageUpdate3,
    name: 'Disability at Tesco',
    page: `${Page.NETWORKS}/disability`,
    count: 10,
  },
  {
    imageSrc: imageUpdate4,
    name: 'Women at Tesco',
    page: `${Page.NETWORKS}/women`,
    count: 7,
  },
];
