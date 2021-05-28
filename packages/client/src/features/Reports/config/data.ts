import { FULL_DAY_FORMAT, isoDateToFormat } from 'utils/date';

export const statisticsData = [
  {
    id: '1',
    name: 'Armed Forces at Tesco',
    members: 96545,
    subscribe: 8545,
    leave: 3745,
    color: '#008800',
    checked: true,
  },
  {
    id: '2',
    name: 'LGBTQ+ at Tesco at Tesco',
    members: 96545,
    subscribe: 8545,
    leave: 3745,
    color: '#00539F',
    checked: true,
  },
];

export const chartData = {
  elements: {},
  regions: [
    {
      name: 'Region A',
      value: 400,
    },
    {
      name: 'Region B',
      value: 300,
    },
    {
      name: 'Region C',
      value: 270,
    },
    {
      name: 'Region D',
      value: 200,
    },
    {
      name: 'Region E',
      value: 278,
    },
    {
      name: 'Region F',
      value: 189,
    },
  ],
  formats: [
    {
      name: 'Format A',
      value: 200,
    },
    {
      name: 'Format B',
      value: 400,
    },
    {
      name: 'Format C',
      value: 570,
    },
    {
      name: 'Format D',
      value: 400,
    },
    {
      name: 'Format E',
      value: 378,
    },
    {
      name: 'Format F',
      value: 159,
    },
  ],
  entities: [
    {
      name: isoDateToFormat('2021-04-07', FULL_DAY_FORMAT),
      'Armed Forces at Tesco': 11,
      'LGBTQ+ at Tesco at Tesco': 10,
    },
    {
      name: isoDateToFormat('2021-04-08', FULL_DAY_FORMAT),
      'Armed Forces at Tesco': 10,
      'LGBTQ+ at Tesco at Tesco': 7,
    },
    {
      name: isoDateToFormat('2021-04-09', FULL_DAY_FORMAT),
      'Armed Forces at Tesco': 100,
      'LGBTQ+ at Tesco at Tesco': 110,
    },
    {
      name: isoDateToFormat('2021-04-10', FULL_DAY_FORMAT),
      'Armed Forces at Tesco': 50,
      'LGBTQ+ at Tesco at Tesco': 30,
    },
    {
      name: isoDateToFormat('2021-04-11', FULL_DAY_FORMAT),
      'Armed Forces at Tesco': 200,
      'LGBTQ+ at Tesco at Tesco': 130,
    },
  ],
};
