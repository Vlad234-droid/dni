import * as Yup from 'yup';

import { FormData } from './types';

const schema = Yup.object().shape({
  image: Yup.mixed().nullable(),
  name: Yup.string().required('Name is required'),
  network: Yup.string().required('Network is required'),
  participantCount: Yup.number().required('Network is required'),
  email: Yup.string().email().required('Network is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .when(
      'startDate',
      (startDate: Date, schema: any) => startDate && schema.min(startDate),
    )
    .required('End Date is required'),
  description: Yup.string().max(
    200,
    'Length of description should be less 200 characters',
  ),
  link: Yup.string(),
});

export default schema;
