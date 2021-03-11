import React, { FC, HTMLProps, useRef, useEffect, ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '@beans/button';
import Icon from '@beans/icon';

import Wrapper, { Props as WrapperProps, Registrable } from '../FieldWrapper';

type Props = HTMLProps<HTMLInputElement> &
  WrapperProps &
  Registrable & { name: string };

const FileInput: FC<Props> = ({ label, error, name }) => {
  const labelEl = useRef<HTMLLabelElement>(null);
  const handleClickInput = () => labelEl.current && labelEl.current.click();
  const { register, unregister, setValue } = useFormContext();
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const handleAttachFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return;
    setValue(name, target.files[0], { shouldValidate: false });
  };

  return (
    <Wrapper {...{ error }}>
      <div>
        <label htmlFor={name} ref={labelEl}>
          <Button
            variant='secondary'
            domRef={register}
            onClick={handleClickInput}
          >
            <Icon graphic='add' inverse={true} />
            {label}
          </Button>
          <input
            type='file'
            id={name}
            name={name}
            onChange={handleAttachFile}
            hidden
          />
        </label>
      </div>
    </Wrapper>
  );
};

export default FileInput;
