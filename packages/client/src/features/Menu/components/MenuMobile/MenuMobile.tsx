import React, { useState, FC } from 'react';
import styled from 'styled-components';
import Icon from '@beans/icon';
import Button from '@beans/button';

import MenuItem from '../MenuItem';
import { itemsMobile } from '../../config/items';

const IconBlock = styled.div`
  width: 24px;
  height: 24px;
  margin: auto;
  overflow: hidden;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const StyledIconDefault = styled.img`
  opacity: 1;
`;

const StyledIconActive = styled.img`
  position: absolute;
  left: 0;
  opacity: 0;
`;

const MobileNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HiddenItems = styled.div`
  overflow: hidden;
  position: fixed;
  bottom: 60px;
  background: ${({ theme }) => theme.colors.white};
  width: calc(75%);
  z-index: 999;
`;

const VisibleItems = styled.div<{ amount: number }>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  & > * {
    flex: 0 0 ${({ amount }) => 100 / (amount + 1)}%;
  }
`;

const MenuBlock = styled.div`
  padding: 8px 4px 0;
  text-align: center;
`;

export const MOBILE_MENU_TEST_ID = 'menu_menu-mobile';
export const MOBILE_MORE_TEST_ID = 'menu_menu-more';

const MenuMobile: FC = () => {
  const [isOpened, setOpened] = useState(false);

  const handleMoreClick = () => {
    setOpened(!isOpened);
  };

  return (
    <MobileNavigation data-testid={MOBILE_MENU_TEST_ID}>
      {isOpened && (
        <HiddenItems>
          {itemsMobile.hidden.map(({ name, page }) => (
            <MenuItem key={name} name={name} page={page}>
              <div>{name}</div>
            </MenuItem>
          ))}
        </HiddenItems>
      )}
      <VisibleItems amount={itemsMobile.visible.length}>
        {itemsMobile.visible.map(({ name, page, iconSrc }) => (
          <MenuItem key={name} name={name} page={page}>
            <MenuBlock>
              <IconBlock>
                <StyledIconDefault src={iconSrc?.default} alt='alt' />
                <StyledIconActive src={iconSrc?.active} alt='alt' />
              </IconBlock>
              <div>{name}</div>
            </MenuBlock>
          </MenuItem>
        ))}
        <div>
          <MenuBlock>
            <Button
              inverse
              onClick={handleMoreClick}
              data-testid={MOBILE_MORE_TEST_ID}
            >
              <Icon graphic={'actions'} size={'xl'} />
            </Button>
          </MenuBlock>
        </div>
      </VisibleItems>
    </MobileNavigation>
  );
};

export default MenuMobile;
