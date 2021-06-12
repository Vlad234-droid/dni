import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Notification from '@beans/notification';

import { actions } from '../../store/slice';
import { skins } from '../../config/skins';
import { ToastSkin } from '../../config/types';

const MyNotification = styled(Notification)`
  padding: 18px 0;
`;

const ToastContent = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
`;

type Id = number | string;

interface ToasterItemProps {
  id: Id;
  skin: ToastSkin;
  data?: Partial<{
    id: Id;
  }>;
  timeout: number;
}

const toasterItemTestId = 'toaster-item-test-id';

const ToasterItem: FC<ToasterItemProps> = ({ id, skin, data, timeout }) => {
  const dispatch = useDispatch();

  const { variant, Content } = skins[skin];

  useEffect(() => {
    if (timeout >= 0 && timeout < Infinity) {
      let timer: ReturnType<typeof setTimeout>;

      if (timeout <= 0) {
        dispatch(actions.deleteToast({ id }));
      } else {
        timer = setTimeout(() => {
          dispatch(actions.updateToastTime({ id, timeout: timeout - 1000 }));
        }, 1000);
      }

      return () => clearTimeout(timer);
    }
  }, [timeout]);

  return (
    <MyNotification
      variant={variant}
      showIcon={false}
      data-testid={toasterItemTestId}
    >
      <ToastContent>{Content && <Content {...data} />}</ToastContent>
    </MyNotification>
  );
};

export default ToasterItem;
export { toasterItemTestId };
