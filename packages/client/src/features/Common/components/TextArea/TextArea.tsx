import React, { FC, HTMLProps } from 'react';
import Textarea from '@beans/textarea';

import Wrapper, { Props as WrapperProps, Registrable } from '../FieldWrapper';

type Props = HTMLProps<HTMLTextAreaElement> & WrapperProps & Registrable;

const TextArea: FC<Props> = ({ label, error, register, ...rest }) => {
  return (
    <Wrapper {...{ label, error }}>
      <Textarea domRef={register} {...rest} defaultValue={''} />
    </Wrapper>
  );
};

export default TextArea;
