import { useState, useEffect, ChangeEvent } from 'react';
import BeansCheckbox from '@beans/checkbox';
import FormGroup from '@beans/form-group';

type Props = {
  label: string;
  error?: string;
  onChange: (checked: boolean) => null;
};

const Checkbox = ({ label, error, onChange }: Props) => {
  const [isChecked, check] = useState<boolean>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    check(e.target.checked);
  };

  useEffect(() => {
    if (typeof isChecked !== 'undefined') {
      onChange(isChecked);
    }
  }, [isChecked]);
  return (
    <FormGroup {...{ label, error }}>
      <BeansCheckbox checked={isChecked || false} onChange={handleChange} />
    </FormGroup>
  );
};

export default Checkbox;
