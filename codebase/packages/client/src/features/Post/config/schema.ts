import * as Yup from 'yup';

export default Yup.object().shape({
  networkTitle: Yup.string().required('Field is required'),
  title: Yup.string().max(100, 'Length of title should be less 100 characters').required('Field is required'),
  story: Yup.string().max(2000, 'Length of story should be less 2000 characters').required('Field is required'),
  confirm: Yup.boolean().oneOf([true], 'Must be accepted'),
});
