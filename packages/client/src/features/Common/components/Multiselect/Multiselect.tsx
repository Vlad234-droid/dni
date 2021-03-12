import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
//@ts-ignore
import MultiSelectDropdown, {
  CheckboxOption,
} from '@beans/multiselect-dropdown';

import Wrapper, { Props as WrapperProps } from '../FieldWrapper';

type Options = {
  options: Array<Record<string, any>>;
};

type Props = HTMLProps<HTMLScriptElement> &
  WrapperProps &
  Options & { name: string };

export type Values = Record<string, boolean>;

export function getSelectedValues(options: Options['options']) {
  return options.reduce((obj, option) => {
    obj[option.id] = option.selected;
    return obj;
  }, {});
}

export const formatValues = (values: Values) =>
  Object.entries(values).reduce((acc: Array<string>, [key, value]) => {
    if (value) {
      acc.push(key);
    }
    return acc;
  }, []);

export const TEST_ID = 'common_multiselect';

const Multiselect: FC<Props> = ({
  name,
  label,
  error,
  options,
  placeholder,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [values, changeValues] = useState<Values>(getSelectedValues(options));

  const { register, unregister, setValue } = useFormContext();

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  useEffect(() => {
    setValue(name, formatValues(values));
  }, [values]);

  const handleToggleOpen = () => setOpen(!isOpen);
  const handleChange = ({
    selectedValues,
  }: {
    selectedValues: Record<string, boolean>;
  }) => {
    changeValues(selectedValues);
  };

  return (
    <Wrapper {...{ label, error }} testId={TEST_ID}>
      <MultiSelectDropdown
        selectText={placeholder}
        onDropdownToggle={handleToggleOpen}
        selectedValues={values}
        onSelect={handleChange}
        open={isOpen}
      >
        {options.map(({ id, labelText }) => (
          <CheckboxOption id={id} key={id} labelText={labelText} />
        ))}
      </MultiSelectDropdown>
    </Wrapper>
  );
};

export default Multiselect;
