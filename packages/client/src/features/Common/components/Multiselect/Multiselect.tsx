import React, { FC, HTMLProps, useEffect, useState } from 'react';

// @ts-ignore
import MultiSelectDropdown, {
  CheckboxOption,
} from '@beans/multiselect-dropdown';
import FormGroup from '@beans/form-group';

import { FieldProps } from '../../config/types';

type Options = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<Record<string, any>>;
};

type Props = HTMLProps<HTMLScriptElement> &
  FieldProps &
  Options & { onChange: (d: Array<string>) => void };

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
  label,
  error,
  options,
  placeholder,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [values, changeValues] = useState<Values>(getSelectedValues(options));

  useEffect(() => {
    // @ts-ignore
    onChange(formatValues(values) as Array<string>);
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
    <FormGroup {...{ label, error }} testId={TEST_ID}>
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
    </FormGroup>
  );
};

export default Multiselect;
