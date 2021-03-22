import React from 'react';
import styled from 'styled-components';
import Link from '@beans/link';
import { TescoLogo } from '@beans/branding';

import Media from 'styles/media';

const Header: React.FC = () => {
  return (
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
};

export default Header;

const Wrapper = styled.div.attrs({
  'data-testid': 'header',
})`
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;

  ${Media.desktop`
    padding: 0 24px;
  `}

  ${Media.desktop`
    max-width:  1366px;
  `}

  ${Media.large_desktop`
    max-width: 1523px;
  `}
`;

const Block = styled.div`
  display: flex;
  height: 100%;
  align-content: center;
  align-items: center;
`;
