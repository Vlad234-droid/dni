import React from 'react';
import Link from '@beans/link';
import { TescoLogo } from '@beans/branding';

import { Wrapper, Block } from './styled';

const Header: React.FC = () => (
  <Wrapper>
    <Block>
      <TescoLogo />
    </Block>
    <Block data-testid='links'>
      <Link
        href={'/'}
        inverse={true}
        icon={{ graphic: 'notification', position: { global: 'right' } }}
        variant='iconButton'
      />
      <Link
        href={'/'}
        inverse={true}
        icon={{ graphic: 'account', position: { global: 'right' } }}
        variant='iconButton'
      />
    </Block>
  </Wrapper>
);

export default Header;
