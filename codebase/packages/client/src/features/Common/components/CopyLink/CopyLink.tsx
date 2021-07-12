import React, { FC, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import Button from '@beans/button';
import Icon from '@beans/icon';

import { getPath } from 'utils/path';

type Props = {
  to?: string;
  showNotification: () => void;
  hideNotification: () => void;
};

const CopyLink: FC<Props> = ({ showNotification, hideNotification, to }) => {
  const handleClick = useCallback(() => {
    const { host, pathname, protocol } = window.location;

    const path = to ? getPath(to) : pathname;
    const url = `${protocol}//${host}${path}`;

    copy(url);

    hideNotification();
    setTimeout(showNotification, 100);
  }, []);

  return (
    <Button data-testid='copy-button' variant='link' onClick={handleClick} size='sm'>
      <Icon graphic='link' data-testid='copy-icon' />
    </Button>
  );
};

export default CopyLink;
