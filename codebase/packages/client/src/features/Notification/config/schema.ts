import * as Yup from 'yup';

import { FormData } from './types';

const schema: Yup.SchemaOf<FormData> = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
});

export default schema;
