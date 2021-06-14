import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@beans/icon';
import Button from '@beans/button';

import { Page } from 'features/Page';

import { items } from '../config/items';
import { Wrapper, Title, List, Image, Name, Count, Item } from './styled';

const NetworkUpdates: FC = () => (
  <Wrapper>
    <Title>Updates in my Networks</Title>
    <List>
      {items.map(({ name, page, count = 0, imageSrc }) => (
        <Item key={name} title={name} to={`/${page}`} activeClassName='active-link'>
          <Image>
            <img src={imageSrc} alt='alt' />
          </Image>
          <Name>{name}</Name>
          {Boolean(count) && (
            <>
              <Count>{count}</Count>
              <Icon graphic={'indicator'} size={'xs'} />
            </>
          )}
        </Item>
      ))}
    </List>
    <Link to={Page.NETWORKS}>
      <Button variant='secondary'>See all</Button>
    </Link>
  </Wrapper>
);

export default NetworkUpdates;
