import { FC, HTMLProps } from 'react';
import Textarea from '@beans/textarea';
import FormGroup from '@beans/form-group';

import { Props as WrapperProps, Registrable } from '../FieldWrapper';

type Props = HTMLProps<HTMLTextAreaElement> &
  WrapperProps &
  Partial<Registrable>;

const TextArea: FC<Props> = ({ label, error, register, ...rest }) => {
  return (
    <FormGroup labelText={label} errorMessage={error} error={Boolean(error)}>
      <Textarea domRef={register} {...rest} defaultValue={''} />
    </FormGroup>
  );
};

export default TextArea;
