import React, { FC, useState } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';
import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';
import Heading from 'features/Heading';
import ButtonFilter from 'features/ButtonFilter';
import { NetworkList, NetworkCarousel } from 'features/Network';
import { useNotification } from 'context/NotificationContext';

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
  const { notifications, removeNotificationBy } = useNotification();

  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.NETWORKS}`}
      renderMain={() => (
        <div data-testid={TEST_ID}>
          <PageHeader
            renderLeft={() => <Heading>Networks</Heading>}
            renderCenter={() => (
              <ButtonFilter
                initialFilters={filters}
                onChange={(key) => setFilter(key as Filter)}
              />
            )}
          />
          <PageWrapper>
            <>
              {notifications &&
                notifications.map(({ id, entity }) => (
                  <div
                    key={id}
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-around',
                    }}
                  >
                    {entity!.title}
                    <div onClick={() => removeNotificationBy([id])}>X</div>
                  </div>
                ))}
            </>
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
