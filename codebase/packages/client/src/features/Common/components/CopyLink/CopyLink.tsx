import React, { FC, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import Button from '@beans/button';
import Icon from '@beans/icon';

type Props = {
  to?: string;
  showNotification: () => void;
  hideNotification: () => void;
};

const CopyLink: FC<Props> = ({ showNotification, hideNotification, to }) => {
  const handleClick = useCallback(() => {
    const { host, pathname } = window.location;
    const pathArray = pathname.split('/');
    // delete 2 items from the end
    pathArray.splice(-2, 2);

    const path = to ? `${pathArray.join('/')}${to}` : pathname;
    const url = `${host}${path}`;

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
