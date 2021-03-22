import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { Link } from 'react-router-dom';

import { Page, PAGE_PREFIX } from 'features/Page';
import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';
import Heading from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import ButtonFilter from 'features/ButtonFilter';
import NetworkCarousel from 'features/NetworkCarousel';
import NetworkList from 'features/NetworkList';

import { filters } from './data';

const TEST_ID = 'container-networks';

const Networks: FC = () => {
  const { isMobile } = useMedia();

  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.NETWORKS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageHeader
            renderLeft={() => <Heading>Networks</Heading>}
            renderRight={() => (
              <Link to={`/${Page.ADD_NETWORKS}`}>
                <Button variant='primary'>
                  <Icon graphic='add' />
                  {!isMobile && 'Create Network'}
                </Button>
              </Link>
            )}
            renderCenter={() => (
              <ButtonFilter
                filters={filters}
                onChange={() => console.log('test')}
              />
            )}
          />
          <PageWrapper>
            <NetworkCarousel />
            <NetworkList />
          </PageWrapper>
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default Networks;
