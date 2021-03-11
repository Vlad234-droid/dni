import eventImage1 from './assets/event-1.png';
import eventImage2 from './assets/event-2.png';
import eventImage3 from './assets/event-3.png';

const filters = [
  {
    key: 1,
    title: 'On-air',
    active: true,
  },
  {
    key: 2,
    title: 'This week',
    active: false,
  },
  {
    key: 3,
    title: 'This month',
    active: false,
  },
];

const events = [
  {
    id: 1,
    title: 'Event Name',
    description:
      'As unique individuals, each of us needs different support to reach our full potential. If you have a disability sometimes this can be harder and our inclusive approach is designed to ...',
    image: {
      alt: 'Disability at Tesco',
      src: eventImage1,
    },
    createdAt: 'Saturday, 31 october 2020 at 20:00',
    members: 42,
    participants: 42,
    answered: 231,
    left: 20,
  },
  {
    id: 2,
    title: 'Event Name',
    subTitle: 'Our Purpose:',
    subDescription:
      'Connecting BAME colleagues and supporting them to be the best that they can be',
    description:
      'BAME (Black, Asian & Minority Ethnic) at Tesco is a colleague network aiming to make a difference by raising awareness of diversity and inclusion within the organisation.',
    image: {
      alt: 'BAME at Tesco',
      src: eventImage2,
    },
    createdAt: 'Saturday, 31 october 2020 at 20:00',
    members: 42,
    participants: 20,
    answered: 231,
    left: 20,
  },
  {
    id: 3,
    title: 'Event Name',
    subTitle: 'Our Purpose:',
    subDescription:
      'Connecting BAME colleagues and supporting them to be the best that they can be',
    description:
      'BAME (Black, Asian & Minority Ethnic) at Tesco is a colleague network aiming to make a difference by raising awareness of diversity and inclusion within the organisation.',
    image: {
      alt: 'Armed Forces at Tesco',
      src: eventImage3,
    },
    createdAt: 'Saturday, 31 october 2020 at 20:00',
    members: 42,
    participants: 30,
    answered: 231,
    left: 20,
  },
  {
    id: 4,
    title: 'Very long Name of the event for test purposes',
    description:
      'As unique individuals, each of us needs different support to reach our full potential. If you have a disability sometimes this can be harder and our inclusive approach is designed to ...',
    image: {
      alt: 'Disability at Tesco',
      src: eventImage1,
    },
    createdAt: 'Saturday, 31 october 2020 at 20:00',
    members: 42,
    participants: 42,
    answered: 231,
    left: 20,
  },
  {
    id: 5,
    title: 'Very long Name of the event for test purposes',
    description:
      'As unique individuals, each of us needs different support to reach our full potential. If you have a disability sometimes this can be harder and our inclusive approach is designed to ...',
    image: {
      alt: 'Disability at Tesco',
      src: eventImage1,
    },
    createdAt: 'Saturday, 31 october 2020 at 20:00',
    members: 42,
    participants: 42,
    answered: 231,
    left: 20,
  },
];

export { filters, events };
