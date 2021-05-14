import React, { FC, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import Button from '@beans/button';
import Icon from '@beans/icon';

type Props = {
  pathname?: string;
  showNotification: () => void;
};

const CopyLink: FC<Props> = ({
  pathname = window.location.pathname,
  showNotification,
}) => {
  const handleClick = useCallback(() => {
    const host = window.location.host;
    const url = `${host}${pathname}`;

    copy(url);

    showNotification();
  }, []);

  return (
    <Button data-testid='copy-button' variant='link' onClick={handleClick}>
      <Icon graphic='link' data-testid='copy-icon' />
    </Button>
  );
};

export default CopyLink;
