import React, { FC, HTMLProps, RefObject } from 'react';
import styled from 'styled-components';

import Label from '../Label';
import Error from '../Error';

export type Props = {
  label?: string;
  error?: string;
};

export type Registrable = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: RefObject<any>;
};

type DivProps = HTMLProps<HTMLDivElement>;

const FieldWrapper: FC<Props> = ({ children, label, error }) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

const Wrapper = styled.div<DivProps>`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 20px;
`;

export default FieldWrapper;
