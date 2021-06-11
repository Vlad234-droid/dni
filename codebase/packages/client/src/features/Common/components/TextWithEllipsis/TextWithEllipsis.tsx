import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

type Props = {
  height?: string;
  maxWidth?: string;
  href?: string;
};

const TextWithEllipsis: FC<Props> = ({ height = 'auto', maxWidth = '100%', href, children }) => (
  <Title height={height} maxWidth={maxWidth}>
    {href ? <Link href={href}>{children}</Link> : children}
  </Title>
);

const Title = styled.h5<{ height: string; maxWidth: string }>`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: ${({ maxWidth }) => maxWidth};
  display: inline-block;
  height: ${({ height }) => height};

  a {
    text-decoration: none;
  }
`;

export default TextWithEllipsis;
