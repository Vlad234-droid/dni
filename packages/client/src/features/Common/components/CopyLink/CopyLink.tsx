import React, { FC, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import Button from '@beans/button';
import Icon from '@beans/icon';

type Props = {
  id?: number;
  showNotification: () => void;
  hideNotification: () => void;
};

const CopyLink: FC<Props> = ({ id, showNotification, hideNotification }) => {
  const handleClick = useCallback(() => {
    const host = window.location.host;
    const pathname = window.location.pathname;
    const url = id ? `${host}${pathname}/${id}` : `${host}${pathname}`;

    copy(url);

    hideNotification();
    setTimeout(showNotification, 100);
  }, []);

  return (
    <Button data-testid='copy-button' variant='link' onClick={handleClick}>
      <Icon graphic='link' data-testid='copy-icon' />
    </Button>
  );
};

export default CopyLink;
