import React, { FC, ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  entityId: string | number;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<Props> = ({ entityId, checked, onChange }: Props) => {
  return (
    <CheckboxWrapper>
      <CheckboxInput id={`${entityId}`} checked={checked} onChange={onChange} />
      <CheckboxMark />
    </CheckboxWrapper>
  );
};

export default Checkbox;

const CheckboxInput = styled.input.attrs({
  type: 'checkbox',
})<{
  id: string | number;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CheckboxMark = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #cccccc;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 10px;
    height: 15px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

const CheckboxWrapper = styled.label`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  &:hover > ${CheckboxInput} ~ ${CheckboxMark} {
    box-shadow: 0 0 0 4px rgba(0, 126, 179, 0.5);
  }

  & > ${CheckboxInput}:checked ~ ${CheckboxMark} {
    background-color: #007eb3;
  }

  & > ${CheckboxInput}:checked ~ ${CheckboxMark}::after {
    display: block;
  }
`;
