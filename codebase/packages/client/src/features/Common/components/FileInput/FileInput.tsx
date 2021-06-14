import React, {
  FC,
  HTMLProps,
  ChangeEvent,
  useRef,
  useState,
  useEffect,
} from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';

import Wrapper from '../FieldWrapper';
import { FieldProps } from '../../config/types';

type Props = HTMLProps<HTMLInputElement> &
  FieldProps & { onChange: (file: File) => void };

const FileInput: FC<Props> = ({ label, error, onChange, name }) => {
  const [file, setFile] = useState<File | null>(null);
  const inputEl = useRef<HTMLInputElement | null>(null);
  // @ts-ignore
  const handleClickButton = () => inputEl.current?.click();

  const handleAttachFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return;
    setFile(target.files[0]);
  };

  useEffect(() => {
    if (file) onChange(file);
  }, [file]);

  return (
    <Wrapper {...{ error }}>
      <div>
        <label htmlFor={name}>
          <Button variant='secondary' onClick={handleClickButton}>
            <Icon graphic='add' inverse={true} />
            {label}
          </Button>
          <input
            ref={inputEl}
            type='file'
            id={name}
            name={name}
            onChange={handleAttachFile}
            hidden
          />
        </label>
        <br />
        {file && file.name}
      </div>
    </Wrapper>
  );
};

export default FileInput;
