import React, { RefObject } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import Button from '@beans/button';
import { FieldWrapper } from 'features/Common/styled';

import type { FormField, Handler } from './config/types';

type Props<T, N> = {
  formFields: Array<FormField<N>>;
  schema: AnyObjectSchema;
  onSubmit: Handler<T>;
  refDom?: RefObject<any>;
  renderButtons?: () => JSX.Element | null;
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
  refDom,
}: Props<T, N>) {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, errors, reset, ...rest } = methods;

  const submit: Handler<T> = (data) => {
    reset();
    onSubmit(data);
  };

  return (
      <form onSubmit={handleSubmit(submit)} ref={refDom}>
        {formFields.map(({ Element, testID, ...props }, idx) => (
          <FieldWrapper key={idx}>
            <Element
              {...props}
             // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              error={errors[props.name!] && errors[props.name!].message}
             id={testID}
             {...rest}
           />
        </FieldWrapper>
      ))}
      {renderContent && renderContent()}
      {renderButtons && renderButtons()}
    </form>
  );
}

export default GenericForm;
