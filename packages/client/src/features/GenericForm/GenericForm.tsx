import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import Button from '@beans/button';

import type { FormField, Handler } from './config/types';

type Props<T, N> = {
  formFields: Array<FormField<N>>;
  schema: AnyObjectSchema;
  onSubmit: Handler<T>;
  renderButtons?: () => JSX.Element;
  renderContent?: () => JSX.Element | null;
};

const defaultRenderButtons = () => <Button type='submit'>submit</Button>;
const defaultRenderContent = () => null;

function GenericForm<T, N>({
  formFields,
  schema,
  onSubmit,
  renderButtons = defaultRenderButtons,
  renderContent = defaultRenderContent,
}: Props<T, N>) {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, errors, reset } = methods;
  const submit: Handler<T> = (data) => {
    reset();
    onSubmit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
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
        {renderContent()}
        {renderButtons()}
      </form>
    </FormProvider>
  );
}

export default GenericForm;
