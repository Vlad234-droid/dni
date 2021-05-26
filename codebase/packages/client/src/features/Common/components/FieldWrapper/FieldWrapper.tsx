import React, { FC, RefObject } from 'react';
import styled from 'styled-components';

import Label from '../Label';

type TestProps = {
  testId?: string;
};

export type Props = {
  label?: string;
  error?: string;
};

export type Registrable = {
  unregister: (name: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: <T extends object>(name: string, data: any, config?: T) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const Error = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.text};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.text.sm};
  font-weight: ${({ theme }) => theme.fontWeight.text};
  color: ${({ theme }) => theme.colors.error};
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default FieldWrapper;
