import React, { FC, useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import Button from '@beans/button';

import Media from 'styles/media';
import { headingXS } from 'styles';

type Props = {
  content?: string[];
  renderContent?: () => JSX.Element;
  isSmall: boolean;
};

const InfoPanelContent: FC<Props> = ({ content, renderContent, isSmall }) => {
  const [isOpen, setIsOpen] = useState(false);

  const memoizedContent = useMemo(() => {
    if (renderContent) return renderContent();

    if (content)
      return (
        <>
          {isOpen && content.length > 1 ? content.map((item, index) => <p key={index}>{item}</p>) : <p>{content[0]}</p>}
          {content.length > 1 && (
            <Button stretch variant='link' onClick={() => setIsOpen((isOpen) => !isOpen)}>
              {isOpen ? 'Read less' : 'Read more'}
            </Button>
          )}
        </>
      );
  }, [isOpen, content, renderContent]);

  return <Wrapper isSmall={isSmall}>{memoizedContent}</Wrapper>;
};

export const Wrapper = styled.div<{ isSmall: boolean }>`
  color: ${({ theme }) => theme.colors.base};
  margin-bottom: 16px;
  ${headingXS};

  ${({ isSmall }) =>
    !isSmall &&
    css`
      ${Media.tablet`
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 24px;
    `}
    `}

  p {
    margin-bottom: 8px;
  }

  button {
    width: auto;
  }
`;

export default InfoPanelContent;
