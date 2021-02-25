import React, { FC } from 'react';

import GenericForm, { Handler as SubmitHandler } from 'features/GenericForm';

import formFields from '../config/formFields';
import schema from '../config/schema';
import { FormData, Names } from '../config/types';

const TestForm: FC = () => {
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return <GenericForm<FormData, Names> {...{ formFields, schema, onSubmit }} />;
};

export default TestForm;
