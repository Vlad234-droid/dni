import React, { FC } from 'react';

import { Wrapper, Header, Title, Content } from './styled';

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
      {renderHeaderFilters && renderHeaderFilters()}
    </Header>
    <Content>{renderContent()}</Content>
  </Wrapper>
);

export { TEST_ID };

export default PageWrapper;
