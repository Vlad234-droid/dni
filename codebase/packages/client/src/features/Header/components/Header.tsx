import React from 'react';
import Link from '@beans/link';
import { TescoLogo } from '@beans/branding';

import { Wrapper, Block } from './styled';
import Toaster from 'features/Toaster';

import { PUBLIC_URL as appRootUrl } from 'config/api';

const TEST_ID = 'header';

const Header: React.FC = () => (
  <Wrapper data-testid={TEST_ID}>
    <Block>
      <TescoLogo />
    </Block>
    <Block data-testid='links'>
      <Link
        href={appRootUrl}
        inverse={true}
        icon={{ graphic: 'notification', position: { global: 'right' } }}
        variant='iconButton'
      />
      {/*<Link*/}
      {/*  href={'/profile'}*/}
      {/*  inverse={true}*/}
      {/*  icon={{ graphic: 'account', position: { global: 'right' } }}*/}
      {/*  variant='iconButton'*/}
      {/*/>*/}
    </Block>
    <Toaster />
  </Wrapper>
);

export { TEST_ID };

export default Header;
