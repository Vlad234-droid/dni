import armedImage from './assets/armed-forces.jpg';
import bameImage from './assets/bame.jpg';
import disabilityImage from './assets/disability.jpg';
import lgbtImage from './assets/lgbtq.jpg';
import womenImage from './assets/women.jpg';

export default [
  {
    id: 1,
    title: 'Armed Forces at Tesco',
    description: [
      'Bringing together former and current members of the armed forces, and their families. Ensuring they are supported with transition from military life, their families have the advice and support they need and helping colleagues who are reservists.'
    ],
    image: {
      src: armedImage,
    },
  },
  {
    id: 2,
    title: 'BAME at Tesco',
    description: [
      'Supporting and encouraging more BAME colleagues to develop their careers with Tesco and helping connect colleagues with a similar interest and background.',
    ],
    image: {
      src: bameImage,
    },
  },
  {
    id: 3,
    title: 'Disability at Tesco',
    description: [
      'Supporting colleagues with disabilities, connecting with people of a similar interest and background and helping colleagues to reach their full potential.',
    ],
    image: {
      src: disabilityImage,
    },
  },
  {
    id: 4,
    title: 'LGBTQ+ at Tesco',
    description: [
      'Connecting our members together in a safe environment and provide a place where they can seek advice and support confidentially on matters that are important to them while helping to shape and support the business with policies, products and services for Tesco LGBTQ+ colleagues and customers.',
    ],
    image: {
      src: lgbtImage,
    },
  },
  {
    id: 5,
    title: 'Women at Tesco',
    description: [
      'Supporting one another to make working life easier, wherever you are in the business and whatever your goals. Helping female colleagues to network, develop, balance work and home life & ensuring we have Role Models in Tesco.',
    ],
    image: {
      src: womenImage,
    },
  },
];
