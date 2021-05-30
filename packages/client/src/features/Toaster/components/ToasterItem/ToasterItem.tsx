import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Notification from '@beans/notification';

import { GREEN_COLOR } from 'styles';

import { actions } from '../../store/slice';
import { skins } from '../../config/skins';
import { ToastSkin } from '../../config/types';

const MyNotification = styled(Notification)`
  // handle custom colors for toaster, when get different Toaster types
  background: ${GREEN_COLOR};
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
}

const toasterItemTestId = 'toaster-item-test-id';

const ToasterItem: FC<ToasterItemProps> = ({ id, skin, data }) => {
  const dispatch = useDispatch();

  const { variant, Content, timeout } = skins[skin];
  const [timeToDestruct, setTime] = useState(timeout || Infinity);

  useEffect(() => {
    if (timeout) {
      let timer: ReturnType<typeof setTimeout>;

      if (timeToDestruct <= 0) {
        dispatch(actions.deleteToast({ id }));
      } else {
        timer = setTimeout(() => {
          setTime(timeToDestruct - 1000);
        }, 1000);
      }

      return () => clearTimeout(timer);
    }
  }, [timeToDestruct, timeout]);

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
