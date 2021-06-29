import React, { FC } from 'react';
import Icon from '@beans/icon';
import Button from '@beans/button';
import Link from '@beans/link';

import { LINKS } from 'config/constants';

import { mainMenuItems } from '../../config/items';
import HelpLink from '../HelpLink';
import { Wrapper, Heading, LinkWrapper } from './styled';

const TEST_ID = 'main-menu-desktop';

type Props = {
  onClose: () => void;
};

const MainMenuMobile: FC<Props> = ({ onClose }) => (
  <Wrapper>
    <Heading>
      <HelpLink />
      <Button variant='secondary' size='sm' onClick={onClose}>
        <Icon graphic='close' size='xs' />
      </Button>
    </Heading>
    <>
      {mainMenuItems.map((item) => (
        <LinkWrapper key={item.id} href={item.href} active={item.active}>
          {item.text}
        </LinkWrapper>
      ))}
      <LinkWrapper href={LINKS.signOut}>Sign out</LinkWrapper>
    </>
    <LinkWrapper>
      <Link href={LINKS.termsAndConditions}>Terms & Conditions</Link>
    </LinkWrapper>
  </Wrapper>
);

export { TEST_ID };

export default MainMenuMobile;
