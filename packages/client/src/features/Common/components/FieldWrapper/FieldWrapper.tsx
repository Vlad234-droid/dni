import React, { FC, RefObject } from 'react';
import styled from 'styled-components';

import Label from '../Label';
import Error from '../Error';

type TestProps = {
  testId?: string;
};

export type Props = {
  label?: string;
  error?: string;
};

export type Registrable = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unregister: (name: string) => void;
  setValue: <T extends object>(name: string, data: any, config?: T) => void;
  register: (name?: string) => void | RefObject<any>;
};

const FieldWrapper: FC<Props & TestProps> = ({
  children,
  label,
  error,
  testId,
}) => {
  return (
    <Wrapper testId={testId}>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs<TestProps>(({ testId }) => ({
  'data-testid': testId,
}))<TestProps>`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default FieldWrapper;
