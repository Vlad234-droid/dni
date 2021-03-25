import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Notification from '@beans/notification';
import Icon from '@beans/icon';

import { actions } from '../../store/slice';
import { skins } from '../../config/skins';
import { ToastSkin } from '../../config/types';

const MyNotification = styled(Notification)`
  padding: 20px 16px 16px 64px;
`;

const ToastContent = styled.div`
  padding-right: 16px;
`;

const ToastCloser = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

const ToastWrapper = styled.div`
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1);
`;

type Id = number | string;

interface ToasterItemProps {
  id: Id;
  skin: ToastSkin;
  data?: Partial<{
    id: Id;
  }>;
}

const toasterItemTestId = 'toaster-item-test-id';

const ToasterItem: FC<ToasterItemProps> = ({ id, skin, data }) => {
  const dispatch = useDispatch();

  const { variant, title, Content, timeout } = skins[skin];
  const [timeToDestruct, setTime] = useState(timeout || Infinity);

  if (timeout) {
    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;

      if (timeToDestruct <= 0) {
        dispatch(actions.deleteToast({ id }));
      } else {
        timer = setTimeout(() => {
          setTime(timeToDestruct - 1000);
        }, 1000);
      }

      return () => clearTimeout(timer);
    }, [timeToDestruct]);
  }

  return (
    <ToastWrapper data-testid={toasterItemTestId}>
      <MyNotification variant={variant} title={title}>
        <ToastContent>
          {Content && <Content {...data} />}
        </ToastContent>
        <ToastCloser
          onClick={() => {
            dispatch(actions.deleteToast({ id }));
          }}
        >
          <Icon graphic='close' />
        </ToastCloser>
      </MyNotification>
    </ToastWrapper>
  );
};

export default ToasterItem;
export { toasterItemTestId };
