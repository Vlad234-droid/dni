import React, { FC, useState, useEffect } from 'react';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import Button from '@beans/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useDispatch from 'hooks/useDispatch';
import useQuery from 'hooks/useQuery';
import useStore from 'hooks/useStore';
import { FieldWrapper, TextInput } from 'features/Common';
import { toasterActions, ToastSkin } from 'features/Toaster';

import schema from '../../config/schema';
import {
  getNotificationSettings,
  updateNotificationSettings,
} from '../../store';
import useSaveEmail from '../../hooks/useSaveEmail';
import { Wrapper, Content, Title } from './styled';
import { FormData } from '../../config/types';

const SUCCESS_TOAST_ID = 'settings-success-toast';
const ERROR_TOAST_ID = 'settings-error-toast';

const NotificationSettings: FC = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const isUnsubscribe = query.get('unsubscribe') == 'true';

  const { notificationSettings } = useStore((state) => state.notifications);
  const [formData, setFormData] = useState({
    receivePostsEmailNotifications: notificationSettings?.receivePostsEmailNotifications,
    receiveEventsEmailNotifications: notificationSettings?.receiveEventsEmailNotifications,
  });
  const [email, onEmailSubmit] = useSaveEmail();

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(schema),
  });

  // fetch settings
  useEffect(() => {
    dispatch(getNotificationSettings());
  }, []);

  useEffect(() => {
    setFormData({
      receivePostsEmailNotifications: notificationSettings?.receivePostsEmailNotifications,
      receiveEventsEmailNotifications: notificationSettings?.receiveEventsEmailNotifications,
    });
  }, [notificationSettings]);

  const onSubmit = async (data: FormData) => {
    onEmailSubmit(data);
    const result = await dispatch(updateNotificationSettings(formData));

    if (updateNotificationSettings.fulfilled.match(result)) {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.SETTINGS_SUCCESS,
          id: SUCCESS_TOAST_ID,
        }),
      );
    } else {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.SETTINGS_ERROR,
          id: ERROR_TOAST_ID,
        }),
      );
    }
  };

  return (
    <Wrapper>
      <CheckboxWithLabel
        id='receive-email-for-posts'
        labelText='Receive email notifications for posts'
        checked={formData.receivePostsEmailNotifications}
        onChange={() =>
          setFormData({ ...formData, receivePostsEmailNotifications: !formData.receivePostsEmailNotifications })
        }
      />
      <CheckboxWithLabel
        id='receive-email-for-events'
        labelText='Receive email notifications for events'
        checked={formData.receiveEventsEmailNotifications}
        onChange={() =>
          setFormData({ ...formData, receiveEventsEmailNotifications: !formData.receiveEventsEmailNotifications })
        }
      />
      <Content
        visible={
          (formData.receivePostsEmailNotifications || formData.receiveEventsEmailNotifications) && !isUnsubscribe
        }
      >
        <Title>Enter email address</Title>
        <form>
          <FieldWrapper>
            <TextInput
              // @ts-ignore
              domRef={register}
              defaultValue={email}
              name={'email'}
              placeholder={'email'}
              // @ts-ignore
              error={errors['email']?.message}
              required
            />
          </FieldWrapper>
        </form>
      </Content>
      <Button size={'md'} onClick={handleSubmit(onSubmit)}>Save Changes</Button>
    </Wrapper>
  );
};

export default NotificationSettings;
