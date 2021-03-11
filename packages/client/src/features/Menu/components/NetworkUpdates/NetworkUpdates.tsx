import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '@beans/icon';
import Button from '@beans/button';

import { itemsUpdates } from '../../config/items';
import MenuItem from '../MenuItem';

const ImageWrapper = styled.div`
  border-radius: 100%;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const NameBlock = styled.div`
  flex: 1;
  margin: 0 10px;
`;

const Count = styled.div`
  margin-right: 10px;
  text-align: right;
`;

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 12px;
  line-height: 22px;
  padding: 12px 10px 0 0;
  text-transform: uppercase;
`;

const MenuWrapper = styled.div`
  margin-bottom: 19px;
`;
const MenuBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;

  &:hover circle {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export const TEST_ID = 'menu_menu-updates';

const Navigation = styled.nav.attrs({
  'data-testid': TEST_ID,
})`
  font-family: ${({ theme }) => theme.fontFamily.text};
  background-color: ${({ theme }) => theme.colors.white};
`;

const NetworkUpdates: FC = () => (
  <Navigation>
    <StyledTitle>Updates in my Networks</StyledTitle>
    <MenuWrapper>
      {itemsUpdates.map(({ name, page, count = 0, imageSrc }) => (
        <MenuItem key={name} name={name} page={page}>
          <MenuBlock>
            <ImageWrapper>
              <img src={imageSrc} alt='alt' />
            </ImageWrapper>
            <NameBlock>{name}</NameBlock>
            {Boolean(count) && (
              <>
                <Count>{count}</Count>
                <Icon graphic={'indicator'} size={'xs'} />
              </>
            )}
          </MenuBlock>
        </MenuItem>
      ))}
    </MenuWrapper>
    <Link to={'/'}>
      <Button variant='secondary'>See all</Button>
    </Link>
  </Navigation>
);

export default NetworkUpdates;
