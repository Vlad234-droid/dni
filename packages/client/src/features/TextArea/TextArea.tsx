import React, { FC, HTMLProps } from 'react';

import FieldWrapper, {
  Props as WrapperProps,
  Registrable,
} from 'features/FieldWrapper';

type Props = HTMLProps<HTMLTextAreaElement> & WrapperProps & Registrable;

const TextArea: FC<Props> = ({ label, error, register, ...rest }) => {
  return (
    <FieldWrapper {...{ label, error }}>
      <textarea ref={register} {...rest} />
    </FieldWrapper>
  );
};

export default TextArea;
