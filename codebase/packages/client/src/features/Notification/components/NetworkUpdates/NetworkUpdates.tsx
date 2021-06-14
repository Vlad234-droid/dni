import React, { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';

import store from 'store';
import { networkUpdatesSelector } from '../../store/selectors';
import { Wrapper, Title, List } from './styled';
import NetworkUpdatesItem from '../NetworkUpdatesItem';

const networkUpdatesTestId = 'network-updates-test-id';

const NetworkUpdates: FC = () => {
  const items = useSelector(() => networkUpdatesSelector(store.getState().notification), shallowEqual);

  return (
    <Wrapper data-testid={networkUpdatesTestId}>
      <Title>Updates in my Networks</Title>
      <List>
        {items.map(({ id, href, name, avatar, notifications }) => {
          return (
            <NetworkUpdatesItem
              key={id}
              {...{
                id,
                href,
                name,
                avatar,
                notifications,
              }}
            />
          );
        })}
      </List>
      <Link to={'/'}>
        <Button variant='secondary'>See all</Button>
      </Link>
    </Wrapper>
  );
};

export default NetworkUpdates;
export { networkUpdatesTestId };
