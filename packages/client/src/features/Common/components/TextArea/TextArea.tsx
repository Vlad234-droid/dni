import { FC, HTMLProps } from 'react';
import Textarea from '@beans/textarea';
import FormGroup from '@beans/form-group';

import { FieldProps } from '../../config/types';

type Props = HTMLProps<HTMLTextAreaElement> &
  FieldProps & { defaultValue?: string };

const TextArea: FC<Props> = ({ label, error, ...rest }) => {
  return (
    <FormGroup labelText={label} errorMessage={error} error={Boolean(error)}>
      <Textarea {...rest} />
    </FormGroup>
  );
};

export default TextArea;
