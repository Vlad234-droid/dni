import React, { FC } from 'react';
import styled from 'styled-components';
import Media from 'styles/media';

const TEST_ID = 'page-wrapper';

type Props = {
  renderHeaderFilters?: () => JSX.Element;
  renderContent: () => JSX.Element;
  pageName: string;
};

const PageWrapper: FC<Props> = ({
  renderHeaderFilters,
  renderContent,
  pageName,
}) => (
  <Wrapper data-testid={TEST_ID}>
    <Header>
      <Title>{pageName}</Title>
    </Header>
    <Content>{renderContent()}</Content>
  </Wrapper>
);

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Title = styled.h3`
  margin-right: 32px;
  font-size: 50px;
  line-height: 71px;
  color: ${({ theme }) => theme.colors.tescoBlue};

  &::after {
    content: '.';
    color: ${({ theme }) => theme.colors.tescoRed};
  }
`;

const Wrapper = styled.div`
  padding: 24px 40px 0;
`;

const Content = styled.div`
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.lines.base};
`;

export { TEST_ID };

export default PageWrapper;
