import React, {FC, useState} from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import BeansLink from '@beans/link';
import { Link } from 'react-router-dom';

import { useMedia } from 'context/InterfaceContext';
import { Page } from 'features/Page';

import { Mode } from '../../types';
import { Wrapper, Content, ContentInner, LinkWrapper } from './styled';

type Props = {
  mode: Mode;
  top?: string;
}

const AccessibilityButton: FC<Props> = ({ mode, top = '0' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMedia();

  const handleButtonClick = () => {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <Wrapper data-testid='accessibility' isOpen={isOpen}>
      <Button data-testid='accessibility-open-button' inverse={mode == Mode.LIGHT || (isMobile && !isOpen)} onClick={handleButtonClick}>
        Accessibility
        <Icon graphic={isOpen ? 'contract' : 'expand'} />
      </Button>
      {isOpen && (
        <Content mode={mode} top={top}>
          <ContentInner>
            <LinkWrapper>
              <Link to={`/${Page.ACCESSIBILITY}`}>
                <BeansLink inverse={mode == Mode.LIGHT}>Information</BeansLink>
              </Link>
            </LinkWrapper>
            <LinkWrapper>
              <BeansLink className='reciteme' inverse={mode == Mode.LIGHT} href={'#'}>Toolbar (Reciteme)</BeansLink>
            </LinkWrapper>
          </ContentInner>
        </Content>
      )}
    </Wrapper>
  );
};

export default AccessibilityButton;
