import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

import type { FormField, Handler } from './config/types';

type Props<T, N> = {
  formFields: Array<FormField<N>>;
  schema: AnyObjectSchema;
  onSubmit: Handler<T>;
};

function GenericForm<T, N>({ formFields, schema, onSubmit }: Props<T, N>) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map(({ Element, testID, ...props }, idx) => (
        <Element
          {...props}
          key={idx}
          register={register}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          error={errors[props.name!] && errors[props.name!].message}
          id={testID}
        />
      ))}
      <input type='submit' />
    </form>
  );
}

export default GenericForm;
