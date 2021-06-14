import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  image: Yup.mixed().nullable(),
  title: Yup.string().required('Title is required'),
  network: Yup.string().required('Network is required'),
  maxParticipants: Yup.number().required('Participants count is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .when(
      'startDate',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (startDate: Date, schema: any) => startDate && schema.min(startDate),
    )
    .required('End Date is required'),
  description: Yup.string().max(
    200,
    'Length of description should be less 200 characters',
  ),
  surveyUrl: Yup.string(),
});

export default formSchema;
