import React, { FC, HTMLProps, useRef, useEffect, ChangeEvent } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';

import Wrapper, { Props as WrapperProps } from '../FieldWrapper';

type Props = HTMLProps<HTMLInputElement> & WrapperProps & { name: string };

const FileInput: FC<Props> = ({
  label,
  error,
  name,
  register,
  unregister,
  setValue,
}) => {
  const labelEl = useRef<HTMLLabelElement | null>(null);
  // @ts-ignore
  const handleClickInput = () => labelEl.current?.click();
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
          <Button variant='secondary' onClick={handleClickInput}>
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
