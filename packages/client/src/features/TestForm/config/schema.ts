import * as Yup from 'yup';

import { FormData } from './types';

const schema: Yup.SchemaOf<FormData> = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

export default schema;
