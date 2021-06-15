import React, { FC, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import Button from '@beans/button';
import Icon from '@beans/icon';

type Props = {
  to?: string;
  showNotification: () => void;
  hideNotification: () => void;
};

const ROOT_PATH = 'diversity-and-inclusion';

const getPathname = (pathname: string, to: string) => (pathname.includes(ROOT_PATH) ? `${ROOT_PATH}${to}` : to);

const CopyLink: FC<Props> = ({ showNotification, hideNotification, to }) => {
  const handleClick = useCallback(() => {
    const { host, pathname } = window.location;

    const path = to ? getPathname(pathname, to) : pathname;
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
