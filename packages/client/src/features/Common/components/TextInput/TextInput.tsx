import { FC, HTMLProps } from 'react';
import Input from '@beans/input';
import FormGroup from '@beans/form-group';

import { Props as WrapperProps, Registrable } from '../FieldWrapper';

type Props = HTMLProps<HTMLInputElement> & WrapperProps & Partial<Registrable>;

const TextInput: FC<Props> = ({
  label,
  error,
  register,
  required,
  ...rest
}) => {
  return (
    <FormGroup
      required={required}
      labelText={label}
      errorMessage={error}
      error={Boolean(error)}
    >
      <Input domRef={register} {...rest} defaultValue={''} />
    </FormGroup>
  );
};

export default TextInput;
