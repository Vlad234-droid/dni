import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ToastSkin, toasterActions } from 'features/Toaster';

import CopyLink from './CopyLink';

type Props = {
  pathname?: string;
};

const CopyLinkContainer: FC<Props> = ({ pathname }) => {
  const dispatch = useDispatch();

  const showNotification = () =>
    dispatch(
      toasterActions.createToast({
        skin: ToastSkin.LINK_COPY_SUCCESS,
      }),
    );

  return <CopyLink pathname={pathname} showNotification={showNotification} />;
};

export default CopyLinkContainer;
