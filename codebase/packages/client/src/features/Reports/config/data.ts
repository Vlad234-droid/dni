import { FULL_DAY_FORMAT, isoDateToFormat } from 'utils/date';

export const getStatisticsData = () => [
  {
    id: '1',
    name: 'Armed Forces at Tesco',
    members: 96545,
    subscribe: 8545,
    leave: 3745,
    color: '#008800',
    checked: true,
    startMembers: 666,
    endMembers: 666,
    percentages: 666,
  },
  {
    id: '2',
    name: 'LGBTQ+ at Tesco at Tesco',
    members: 96545,
    subscribe: 8545,
    leave: 3745,
    color: '#00539F',
    checked: true,
    startMembers: 666,
    endMembers: 666,
    percentages: 666,
  },
];

export const getChartData = () => ({
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
});

export const getRegionsData = () => [
  {
    entityId: 0,
    entitySlug: '0',
    entityName: 'Entity-0-name',
    participants: [
      { regionName: 'Unknown X1', count: 2432 },
      { regionName: 'Unknown X2', count: 344 },
      { regionName: 'Unknown X3', count: 87 },
      { regionName: 'Unknown X4', count: 654 },
      { regionName: 'Unknown X5', count: 1777 },
      { regionName: 'Unknown X6', count: 567 },
    ],
  },
  {
    entityId: 1,
    entitySlug: '1',
    entityName: 'Entity-1-name',
    participants: [
      { regionName: 'Unknown X1', count: 923 },
      { regionName: 'Unknown X2', count: 0 },
      { regionName: 'Unknown X3', count: 444 },
      { regionName: 'Unknown X4', count: 655 },
      { regionName: 'Unknown X5', count: 2002 },
      { regionName: 'Unknown X6', count: 777 },
    ],
  },
];

export const getDepartmentsData = () => [
  {
    entityId: 0,
    entitySlug: '0',
    entityName: 'Entity-0-name',
    participants: [
      { department: 'Office 1', count: 88 },
      { department: 'Office 2', count: 1000 },
      { department: 'Office 3', count: 333 },
      { department: 'Office 4', count: 666 },
      { department: 'Office 5', count: 2222 },
      { department: 'Office 6', count: 3000 },
    ],
  },
  {
    entityId: 1,
    entitySlug: '1',
    entityName: 'Entity-1-name',
    participants: [
      { department: 'Office 1', count: 2288 },
      { department: 'Office 2', count: 1000 },
      { department: 'Office 3', count: 333 },
      { department: 'Office 4', count: 1666 },
      { department: 'Office 5', count: 77 },
      { department: 'Office 6', count: 500 },
    ],
  },
];
