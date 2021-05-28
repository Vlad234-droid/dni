import React, { FC, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import Button from '@beans/button';
import Icon from '@beans/icon';

type Props = {
  pathname?: string;
  showNotification: () => void;
  hideNotification: () => void;
};

const CopyLink: FC<Props> = ({
  pathname = window.location.pathname,
  showNotification,
  hideNotification,
}) => {
  const handleClick = useCallback(() => {
    const host = window.location.host;
    const url = `${host}${pathname}`;

    copy(url);

    hideNotification();
    setTimeout(showNotification, 100);
  }, []);

  return (
    <Button
      data-testid='copy-button'
      variant='link'
      onClick={handleClick}
      size='sm'
    >
      <Icon graphic='link' data-testid='copy-icon' />
    </Button>
  );
};

export default CopyLink;
