import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Button from '@beans/button';

import Media from 'styles/media';
import { headingXS } from 'styles';

type Props = {
  content: string[];
};

const InfoPanelContent: FC<Props> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      {isOpen && content.length > 1 ? (
        content.map((item, index) => <p key={index}>{item}</p>)
      ) : (
        <p>{content[0]}</p>
      )}
      {content.length > 1 && (
        <Button
          stretch
          variant='link'
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? 'Read less' : 'Read more'}
        </Button>
      )}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.base};
  margin-bottom: 16px;
  ${headingXS};

  ${Media.tablet`
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 24px;
  `}

  p {
    margin-bottom: 8px;
  }

  button {
    width: auto;
  }
`;

export default InfoPanelContent;
