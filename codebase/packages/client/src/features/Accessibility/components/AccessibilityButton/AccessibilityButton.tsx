import React, { FC, useState } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import BeansLink from '@beans/link';
import { Link } from 'react-router-dom';

import { useMedia } from 'context/InterfaceContext';
import { Page } from 'features/Page';
import { isNextYear } from 'features/Header';

import { Mode } from '../../types';
import { Wrapper, Content, ContentInner, LinkWrapper } from './styled';

type Props = {
  mode: Mode;
};

const AccessibilityButton: FC<Props> = ({ mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMedia();

  const handleButtonClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleRecitemeButtonClick = () => {
    window.loadService();
  };

  const handleLinkClick = () => setIsOpen(false);

  return (
    <Wrapper data-testid='accessibility' isOpen={isOpen}>
      <Button
        data-testid='accessibility-open-button'
        inverse={mode == Mode.LIGHT || (isMobile && !isOpen)}
        onClick={handleButtonClick}
      >
        Accessibility
        <Icon graphic={'expand'} />
      </Button>
      <Content mode={mode} isOpen={isOpen} isNextYear={isNextYear()} data-testid='accessibility-content'>
        <ContentInner>
          <LinkWrapper inverse={mode == Mode.LIGHT}>
            <Link to={`/${Page.ACCESSIBILITY}`} onClick={handleLinkClick}>
              <BeansLink inverse={mode == Mode.LIGHT}>Information</BeansLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper inverse={mode == Mode.LIGHT}>
            <BeansLink
              className='reciteme'
              inverse={mode == Mode.LIGHT}
              onClick={handleRecitemeButtonClick}
            >
              Toolbar (Reciteme)
            </BeansLink>
          </LinkWrapper>
        </ContentInner>
      </Content>
    </Wrapper>
  );
};

export default AccessibilityButton;
