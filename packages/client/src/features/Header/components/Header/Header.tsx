import React from 'react';
import Link from '@beans/link';
import Icon from '@beans/icon';

import { MenuDesktop } from 'features/Menu';
import Toaster from 'features/Toaster';
import { useMedia } from 'context/InterfaceContext';

import {
  Wrapper,
  Icons,
  IconWrapper,
  ToasterWrapper,
  MenuWrapper,
  Title,
} from './styled';

const TEST_ID = 'header';

const Header: React.FC = () => {
  const { isDesktop } = useMedia();

  return (
    <Wrapper data-testid={TEST_ID}>
      {isDesktop && (
        <MenuWrapper>
          <MenuDesktop />
        </MenuWrapper>
      )}
      {!isDesktop && <Title>Diversity & Inclusion</Title>}
      <Icons>
        <IconWrapper>
          <Link
            href={'/'}
            icon={{ graphic: 'notification', position: { global: 'right' } }}
            inverse={!isDesktop}
            variant='iconButton'
          />
        </IconWrapper>
        <IconWrapper>
          <Link
            href={'/profile'}
            icon={{ graphic: 'account', position: { global: 'right' } }}
            inverse={!isDesktop}
            variant='iconButton'
          />
        </IconWrapper>
        {!isDesktop && (
          <IconWrapper>
            <Icon graphic='menu' />
            {/*<Link*/}
            {/*  href={'/profile'}*/}
            {/*  icon={{ graphic: 'account', position: { global: 'right' } }}*/}
            {/*  inverse={!isDesktop}*/}
            {/*  variant='iconButton'*/}
            {/*/>*/}
          </IconWrapper>
        )}
      </Icons>
      <ToasterWrapper>
        <Toaster />
      </ToasterWrapper>
    </Wrapper>
  );
};

export { TEST_ID };

export default Header;
