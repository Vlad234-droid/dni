import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string().max(
    100,
    'Length of title should be less 100 characters',
  ).required('Field is required'),
  content: Yup.string().max(
    2000,
    'Length of content should be less 2000 characters',
  ).required('Field is required'),
  confirm: Yup.boolean()
    .oneOf([true], 'Must be accepted')
});
