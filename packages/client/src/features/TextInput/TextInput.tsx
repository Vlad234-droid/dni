import React, { FC, HTMLProps } from 'react';

import Wrapper, { Props as WrapperProps, Registrable } from '../FieldWrapper';

type Props = HTMLProps<HTMLInputElement> & WrapperProps & Registrable;

const TextInput: FC<Props> = ({ label, error, register, ...rest }) => {
  return (
    <Wrapper {...{ label, error }}>
      <input ref={register} {...rest} />
    </Wrapper>
  );
};

export default TextInput;
