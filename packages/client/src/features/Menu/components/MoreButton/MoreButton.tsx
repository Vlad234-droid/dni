import React, { FC, useMemo } from 'react';
import Icon from '@beans/icon';

import { Item } from '../MenuMobile/styled';
import { Wrapper, Text } from './styled';
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
        <Icon graphic={'actions'} size='sm' />
        <Text>{moreButtonText}</Text>
      </Item>
    </Wrapper>
  );
};

export default MoreButton;
