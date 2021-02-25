import React from 'react';
import styled from 'styled-components';
import Link from '@beans/link';
// @ts-ignore
import { TescoLogo } from '@beans/branding';

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
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Block = styled.div`
  display: flex;
  height: 100%;
  align-content: center;
  align-items: center;
`;
