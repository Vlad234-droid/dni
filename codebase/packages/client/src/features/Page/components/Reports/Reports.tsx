import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Page, PAGE_PREFIX } from 'features/Page';
import Reports, { Entity } from 'features/Reports';
import { menuItemsDesktop } from 'features/Menu';
import store from 'store';

import BasePage from '../BasePage';
import PageWrapper from '../PageWrapper';
import { TEST_ID } from '../Networks/Networks';

const ReportPage: FC = () => {
  const dispatch = useDispatch();

  const { entityType } = useSelector(() => store.getState().reports);

  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.REPORTS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageWrapper
            renderContent={() => (
              <ContentWrapper>
                {entityType === Entity.NETWORK && <Reports />}
                {entityType === Entity.EVENT && <Reports />}
              </ContentWrapper>
            )}
            pageName={menuItemsDesktop[Page.REPORTS]}
          />
        </div>
      )}
    />
  );
};

const ContentWrapper = styled.div`
  padding-top: 10px;
`;

export default ReportPage;
