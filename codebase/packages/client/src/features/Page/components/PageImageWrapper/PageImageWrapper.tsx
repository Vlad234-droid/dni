import React, { FC } from 'react';

import { Wrapper, Header, Content } from './styled';

const TEST_ID = 'page-image-wrapper';

type Props = {
  renderImage: () => JSX.Element;
};

const PageImageWrapper: FC<Props> = ({ children, renderImage }) => (
  <Wrapper data-testid={TEST_ID}>
    <Header>{renderImage()}</Header>
    <Content>{children}</Content>
  </Wrapper>
);

export { TEST_ID };

export default PageImageWrapper;
