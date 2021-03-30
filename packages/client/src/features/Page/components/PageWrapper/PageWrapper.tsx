import React, { FC } from 'react';
import styled from 'styled-components';
import Media from 'styles/media';

const TEST_ID = 'page-wrapper';

const PageWrapper: FC = ({ children }) => (
  <Wrapper data-testid={TEST_ID}>{children}</Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 1000px;
  margin: -56px auto 0;
  height: 100%;
  padding: 24px 0;
  border-radius: 16px 16px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  ${Media.desktop`
    margin: -56px 40px -10px 40px;
    padding: 32px 0;
    border-radius: 32px 32px 0 0;
  `}
`;

export { TEST_ID };

export default PageWrapper;
