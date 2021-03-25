import React, { FC, useState } from 'react';
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
import { NetworkList, NetworkCarousel } from 'features/Networks';

const ALL = 'ALL';
const YOUR_NETWORKS = 'YOUR_NETWORKS';
const YOU_MANAGE = 'YOU_MANAGE';

const filters = [
  {
    key: ALL,
    title: 'All',
    active: true,
  },
  {
    key: YOUR_NETWORKS,
    title: 'Your networks',
    active: false,
  },
  {
    key: YOU_MANAGE,
    title: 'You manage',
    active: false,
  },
];

type Filter = typeof ALL | typeof YOUR_NETWORKS | typeof YOU_MANAGE;

const TEST_ID = 'container-networks';

const Networks: FC = () => {
  const [filter, setFilter] = useState<Filter>(ALL);
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
                initialFilters={filters}
                onChange={(key) => setFilter(key as Filter)}
              />
            )}
          />
          <PageWrapper>
            <NetworkCarousel />
            <NetworkList filter={filter} />
          </PageWrapper>
        </div>
      )}
    />
  );
};

export { TEST_ID };

export default Networks;
