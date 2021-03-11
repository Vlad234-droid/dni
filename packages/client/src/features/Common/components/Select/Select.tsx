import React, { FC, HTMLProps } from 'react';
import Dropdown, { Option } from '@beans/dropdown';

import Wrapper, { Props as WrapperProps, Registrable } from '../FieldWrapper';

type Options = {
  options: Array<string>;
};
type Props = HTMLProps<HTMLScriptElement> &
  WrapperProps &
  Registrable &
  Options;

const Select: FC<Props> = ({ label, error, register, options }) => {
  return (
    <Wrapper {...{ label, error }}>
      <Dropdown domRef={register}>
        {options.map((value, idx) => (
          <Option value={value} key={idx}>
            {value}
          </Option>
        ))}
      </Dropdown>
    </Wrapper>
  );
};

export default Select;
