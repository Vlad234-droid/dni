import React, { FC , HTMLProps } from 'react';


import styled from 'styled-components';

type Props = HTMLProps<HTMLSpanElement>;

const IconWrapper = styled.div<Props>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  cursor: pointer;
  overflow: hidden;
`;

export default IconWrapper;
