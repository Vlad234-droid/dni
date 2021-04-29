import React, { FC, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import Button from '@beans/button';
import Icon from '@beans/icon';

const CopyLink: FC = () => {
  // const [isCopied, setCopied] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    const url = window.location.href;
    copy(url);
    // setCopied(true);
  }, []);

  return (
    <Button variant='link' onClick={handleClick}>
      <Icon graphic='link' />
    </Button>
  );
};

export default CopyLink;
