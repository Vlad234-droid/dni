import React, { FC } from 'react';
import { Footnote } from '@beans/typography';
import Link from '@beans/link';
import styled from 'styled-components';

import Media from 'styles/media';

type Props = {
  footnote: {
    title: string;
    link: string;
    linkText: string;
  };
};

const InfoPanelFootnote: FC<Props> = ({ footnote }) => (
  <Wrapper>
    <Footnote>
      <span>{footnote.title}</span>
      <Link href={footnote.link} target='_blank'>
        {footnote.linkText}
      </Link>
    </Footnote>
  </Wrapper>
);

export const Wrapper = styled.div`
  margin-bottom: 32px;

  & > p {
    ${Media.small_desktop`
      display: flex;
    `}

    p {
      ${Media.small_desktop`
        margin-right: 4px;
      `}
    }
  }
`;

export default InfoPanelFootnote;
