import React, { FC, useMemo } from 'react';
import Icon from '@beans/icon';

import { Item } from '../MenuMobile/styled';
import { Wrapper, IconWrapper } from './styled';
import { isHiddenItemActive, getMoreButtonText } from '../../utils';

type Props = {
  onClick: () => void;
  isOpened: boolean;
  pathname: string;
};

const MoreButton: FC<Props> = ({ onClick, isOpened, pathname }) => {
  const isActive = useMemo(() => isOpened || isHiddenItemActive(pathname), [
    isOpened,
    pathname,
  ]);
  const moreButtonText = useMemo(() => getMoreButtonText(pathname), [pathname]);

  return (
    <Wrapper
      data-testid='menu-more-button'
      onClick={onClick}
      isActive={isActive}
    >
      <Item>
        <IconWrapper>
          <Icon graphic={'actions'} size='sm' />
        </IconWrapper>
        <div>{moreButtonText}</div>
      </Item>
    </Wrapper>
  );
};

export default MoreButton;
