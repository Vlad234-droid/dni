import React, { FC } from 'react';

import { Wrapper, Header, Title, Content } from './styled';

const TEST_ID = 'page-wrapper';

type Props = {
  renderHeaderFilters?: () => JSX.Element;
  renderContent: () => JSX.Element;
  renderLink?: () => JSX.Element;
  pageName: string;
  withBorder?: boolean;
};

const PageWrapper: FC<Props> = ({ renderHeaderFilters, renderContent, renderLink, pageName, withBorder = false }) => (
  <Wrapper data-testid={TEST_ID}>
    <Header>
      <Title>{pageName}</Title>
      {renderLink && renderLink()}
      {renderHeaderFilters && renderHeaderFilters()}
    </Header>
    <Content withBorder={withBorder}>{renderContent()}</Content>
  </Wrapper>
);

export { TEST_ID };

export default PageWrapper;
