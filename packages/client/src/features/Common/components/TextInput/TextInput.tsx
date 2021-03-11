import React, { FC, HTMLProps } from 'react';
import Input from '@beans/input';

import Wrapper, { Props as WrapperProps, Registrable } from '../FieldWrapper';

type Props = HTMLProps<HTMLInputElement> & WrapperProps & Registrable;

const TextInput: FC<Props> = ({ label, error, register, ...rest }) => {
  return (
    <Wrapper {...{ label, error }}>
      <Input domRef={register} {...rest} defaultValue={''} />
    </Wrapper>
  );
};

export default TextInput;
