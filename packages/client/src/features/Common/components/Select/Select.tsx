import React, { FC, HTMLProps } from 'react';
import Dropdown, { Option } from '@beans/dropdown';
import FormGroup from '@beans/form-group';

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
    <FormGroup labelText={label} errorMessage={error} error={Boolean(error)}>
      <Dropdown domRef={register}>
        {options.map((value, idx) => (
          <Option value={value} key={idx}>
            {value}
          </Option>
        ))}
      </Dropdown>
    </FormGroup>
  );
};

export default Select;
