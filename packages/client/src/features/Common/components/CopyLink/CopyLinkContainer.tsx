import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ToastSkin, toasterActions } from 'features/Toaster';

import CopyLink from './CopyLink';

type Props = {
  pathname?: string;
};

const TOAST_ID = 'copy-link-toast';

const CopyLinkContainer: FC<Props> = ({ pathname }) => {
  const dispatch = useDispatch();

  const showNotification = () =>
    dispatch(
      toasterActions.createToast({
        skin: ToastSkin.LINK_COPY_SUCCESS,
        id: TOAST_ID,
      }),
    );

  const hideNotification = () =>
    dispatch(toasterActions.deleteToast({ id: TOAST_ID }));

  return (
    <CopyLink
      pathname={pathname}
      showNotification={showNotification}
      hideNotification={hideNotification}
    />
  );
};

export default CopyLinkContainer;
