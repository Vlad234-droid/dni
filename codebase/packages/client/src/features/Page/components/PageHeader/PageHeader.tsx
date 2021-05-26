import React, { FC } from 'react';

import {
  Wrapper,
  LeftContainer,
  RightContainer,
  CenterContainer,
} from './styled';

const TEST_ID = 'page-header';

type Props = {
  renderLeft?: () => JSX.Element;
  renderRight?: () => JSX.Element;
  renderCenter?: () => JSX.Element;
};

const PageHeader: FC<Props> = ({
  renderLeft,
  renderRight,
  renderCenter,
  children,
}) => (
  <Wrapper data-testid={TEST_ID}>
    {children}
    {renderLeft && <LeftContainer>{renderLeft()}</LeftContainer>}
    {renderRight && <RightContainer>{renderRight()}</RightContainer>}
    {renderCenter && <CenterContainer>{renderCenter()}</CenterContainer>}
  </Wrapper>
);

export { TEST_ID };

export default PageHeader;
