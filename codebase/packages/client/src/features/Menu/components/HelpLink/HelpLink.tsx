import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';
import Icon from '@beans/icon';
import Button from '@beans/button';

const TEST_ID = 'help-link';

const HelpLink: FC = () => (
  <Wrapper>
    <Link href='https://www.ourtesco.com/colleague/help'>
      <Button variant='link'>
        <Icon graphic='help' />
        Help
      </Button>
    </Link>
  </Wrapper>
);

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lines.base};
  border-radius: 45px;
  padding: 8px 11px 0;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.link.active};

    .beans-button__container {
      text-decoration: none;
    }
  }

  .beans-button__text {
    color: ${({ theme }) => theme.colors.grayscale};
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    margin-left: 6px;
  }

  .beans-icon__svg {
    width: 30px;
    height: 30px;
  }
`;

export { TEST_ID };

export default HelpLink;
