import * as Yup from 'yup';

import { FormData } from './types';

const schema: Yup.SchemaOf<FormData> = Yup.object().shape({
  image: Yup.mixed().nullable(),
  title: Yup.string().required('Title is required'),
  email: Yup.string().email().required('Email is required'),
  manager: Yup.string().email().required('Manager is required'),
  description: Yup.string().max(
    200,
    'Length of description should be less 200 characters',
  ),
  partnership: Yup.string().email(),
});

export default schema;
