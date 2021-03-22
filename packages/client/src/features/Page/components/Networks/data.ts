import networkImage1 from './assets/network-1.png';
import networkImage2 from './assets/network-2.png';
import networkImage3 from './assets/network-3.png';

const filters = [
  {
    key: 1,
    title: 'All',
    active: true,
  },
  {
    key: 2,
    title: 'New networks',
    active: false,
  },
];

const networks = [
  {
    id: 1,
    title: 'Disability at Tesco',
    description:
      'As unique individuals, each of us needs different support to reach our full potential. If you have a disability sometimes this can be harder and our inclusive approach is designed to ...',
    image: {
      alt: 'Disability at Tesco',
      src: networkImage1,
    },
    participants: 42,
  },
  {
    id: 2,
    title: 'BAME at Tesco',
    subTitle: 'Our Purpose:',
    subDescription:
      'Connecting BAME colleagues and supporting them to be the best that they can be',
    description:
      'BAME (Black, Asian & Minority Ethnic) at Tesco is a colleague network aiming to make a difference by raising awareness of diversity and inclusion within the organisation.',
    image: {
      alt: 'BAME at Tesco',
      src: networkImage2,
    },
    participants: 20,
  },
  {
    id: 3,
    title: 'Armed Forces at Tesco',
    subTitle: 'Our Purpose:',
    subDescription:
      'Connecting BAME colleagues and supporting them to be the best that they can be',
    description:
      'BAME (Black, Asian & Minority Ethnic) at Tesco is a colleague network aiming to make a difference by raising awareness of diversity and inclusion within the organisation.',
    image: {
      alt: 'Armed Forces at Tesco',
      src: networkImage3,
    },
    participants: 30,
  },
  {
    id: 4,
    title: 'Disability at Tesco',
    description:
      'As unique individuals, each of us needs different support to reach our full potential. If you have a disability sometimes this can be harder and our inclusive approach is designed to ...',
    image: {
      alt: 'Disability at Tesco',
      src: networkImage1,
    },
    participants: 42,
  },
];

export { filters, networks };
