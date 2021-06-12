import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import Link from '@beans/link';

import { Wrapper, Header, Title, Content } from './styled';

const TEST_ID = 'page-wrapper';

type Props = {
  renderHeaderFilters?: () => JSX.Element;
  renderContent: () => JSX.Element;
  pageName: string;
  withBorder?: boolean;
};

const PageWrapper: FC<Props> = ({
  renderHeaderFilters,
  renderContent,
  pageName,
  withBorder = false,
}) => (
  <Wrapper data-testid={TEST_ID}>
    <Header>
      <Title>{pageName}</Title>
      {['events', 'networks'].includes(pageName.toLowerCase()) && (
        <Link
          title={'strappi | sso'}
          href={'https://ppe.ourtesco.com/colleague-cms/admin/'}
        >
          <Button>
            <Icon graphic='externalLink' />
          </Button>
        </Link>
      )}
      {renderHeaderFilters && renderHeaderFilters()}
    </Header>
    <Content withBorder={withBorder}>{renderContent()}</Content>
  </Wrapper>
);

export { TEST_ID };

export default PageWrapper;
