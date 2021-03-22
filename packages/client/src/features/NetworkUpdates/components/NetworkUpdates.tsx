import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@beans/icon';
import Button from '@beans/button';

import { MenuItem } from 'features/Menu';

import { items } from '../config/items';
import { Wrapper, Title, List, Item, Image, Name, Count } from './styled';

const NetworkUpdates: FC = () => (
  <Wrapper>
    <Title>Updates in my Networks</Title>
    <List>
      {items.map(({ name, page, count = 0, imageSrc }) => (
        <MenuItem key={name} name={name} page={page}>
          <Item>
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
        </MenuItem>
      ))}
    </List>
    <Link to={'/'}>
      <Button variant='secondary'>See all</Button>
    </Link>
  </Wrapper>
);

export default NetworkUpdates;
