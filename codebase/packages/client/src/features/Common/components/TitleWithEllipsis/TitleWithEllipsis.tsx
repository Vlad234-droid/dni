import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

import Media from 'styles/media';
import { headingXS } from 'styles';

type Props = {
  titleHeight: string;
  href?: string;
};

const TitleWithEllipsis: FC<Props> = ({ titleHeight, href, children }) =>
  href ? (
    <Title titleHeight={titleHeight}>
      <Link href={href}>{children}</Link>
    </Title>
  ) : (
    <Title titleHeight={titleHeight}>{children}</Title>
  );

const Title = styled.h5<{ titleHeight: string }>`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  display: inline-block;
  ${headingXS};
  height: ${({ titleHeight }) => titleHeight};
  color: ${({ theme }) => theme.colors.tescoBlue};
  margin-right: 24px;

  ${Media.tablet`
    font-size: 20px;
    line-height: 1.4;
  `}

  a {
    text-decoration: none;
  }
`;

export default TitleWithEllipsis;
