import { FC, HTMLProps } from 'react';
import Input from '@beans/input';
import FormGroup from '@beans/form-group';

import { FieldProps } from '../../config/types';

type Props = HTMLProps<HTMLInputElement> & FieldProps;

const TextInput: FC<Props> = ({ label, error, required, ...rest }) => {
  return (
    <FormGroup
      required={required}
      labelText={label}
      errorMessage={error}
      error={Boolean(error)}
    >
      <Input {...rest} />
    </FormGroup>
  );
};

export default TextInput;
