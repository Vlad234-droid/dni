import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';
import Icon from '@beans/icon';
import Button from '@beans/button';
import { OURTESCO_URL } from 'config/constants';

const TEST_ID = 'help-link';

const HelpLink: FC = () => (
  <Wrapper>
    <Link href={`${OURTESCO_URL}/colleague/help`}>
      <Button variant='link'>
        <Icon graphic='help' />
        Help
      </Button>
    </Link>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 90px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.lines.base};
  border-radius: 45px;
  padding: 0 11px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.link.active};

    .beans-button__container {
      text-decoration: none;
    }
  }

  .beans-link__anchor {
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .beans-button__text {
    color: ${({ theme }) => theme.colors.grayscale};
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    margin-left: 8px;
  }

  .beans-icon__svg {
    width: 24px;
    height: 24px;
  }
`;

export { TEST_ID };

export default HelpLink;
