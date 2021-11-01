import React, { FC } from 'react';
import styled from 'styled-components';

import Accessibility, { Mode } from 'features/Accessibility';

import HeaderLink from '../HeaderLink';

const TEST_ID = 'header-main';

const HeaderTop: FC = () => {

  return (
    <Wrapper data-testid='header-top'>
      <Accessibility mode={Mode.DARK} top={'36px'} />
      <HeaderLink />
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  
  & > :not(:last-child) {
    margin-right: 16px;
    border-right: 1px solid ${({ theme }) => theme.colors.white};
  }
`;

export { TEST_ID };

export default HeaderTop;
