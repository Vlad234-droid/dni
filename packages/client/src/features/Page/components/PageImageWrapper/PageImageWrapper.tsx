import React, { FC } from 'react';

import { Header, Content } from './styled';

const TEST_ID = 'page-wrapper';

type Props = {
  renderImage: () => JSX.Element;
};

const PageImageWrapper: FC<Props> = ({ children, renderImage }) => (
  <div data-testid={TEST_ID}>
    <Header>{renderImage()}</Header>
    <Content>{children}</Content>
  </div>
);

export { TEST_ID };

export default PageImageWrapper;
