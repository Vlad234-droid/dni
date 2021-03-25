import * as Yup from 'yup';

const schema = Yup.object().shape({
  image: Yup.mixed().nullable(),
  title: Yup.string().required('Title is required'),
  network: Yup.string().required('Network is required'),
  maxParticipants: Yup.number().required('Participants count is required'),
  startedAt: Yup.date().required('Start Date is required'),
  finishedAt: Yup.date()
    .when(
      'startDate',
      (startDate: Date, schema: any) => startDate && schema.min(startDate),
    )
    .required('End Date is required'),
  description: Yup.string().max(
    200,
    'Length of description should be less 200 characters',
  ),
  surveyLink: Yup.string(),
});

export default schema;
