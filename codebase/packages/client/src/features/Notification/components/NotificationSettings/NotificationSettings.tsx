import React, { FC, useState, useEffect } from 'react';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import Button from '@beans/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CONTACT_API_ENABLED } from 'config/constants';

import omit from 'lodash.omit';

import useDispatch from 'hooks/useDispatch';
import useQuery from 'hooks/useQuery';
import useStore from 'hooks/useStore';
import { ToastSkin, toasterActions } from 'features/Toaster';
import { FieldWrapper, TextInput } from 'features/Common';

import schema from '../../config/schema';
import { FormData, EmailAddress } from '../../config/types';
import {
  getPersonalEmail,
  getNotificationSettings,
  updatePersonalEmail,
  createPersonalEmail,
  updateNotificationSettings,
} from '../../store';
import { Wrapper, Content, Title } from './styled';

const SUCCESS_TOAST_ID = 'settings-success-toast';
const ERROR_TOAST_ID = 'settings-success-toast';

const NotificationSettings: FC = () => {
  const { personalEmail, notificationSettings } = useStore((state) => state.notifications);
  const {
    settings: { receivePostsEmailNotifications, receiveEventsEmailNotifications },
  } = notificationSettings;
  const [emailAddress, setEmailAddress] = useState<EmailAddress>(personalEmail!);
  const [formData, setFormData] = useState({
    email: personalEmail ? personalEmail.emailAddress : '',
    receivePostsEmailNotifications,
    receiveEventsEmailNotifications,
  });
  const query = useQuery();
  const isUnsubscribe = query.get('unsubscribe') == 'true';

  const dispatch = useDispatch();

  const showSuccessNotification = () =>
    dispatch(
      toasterActions.createToast({
        skin: ToastSkin.SETTINGS_SUCCESS,
        id: SUCCESS_TOAST_ID,
      }),
    );

  const showErrorNotification = () =>
    dispatch(
      toasterActions.createToast({
        skin: ToastSkin.WRONG_INTERVAL,
        id: ERROR_TOAST_ID,
      }),
    );

  const { colleagueUUID } = useStore((state) => state.auth.user);

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // if the user changed the personal address
      if (emailAddress?.emailAddress && data.email && emailAddress?.emailAddress != data.email) {
        const result = await dispatch(
          updatePersonalEmail({
            ...emailAddress,
            emailAddress: data.email,
            oldEmailAddress: emailAddress?.emailAddress,
          }),
        );

        if (CONTACT_API_ENABLED) {
          if (updatePersonalEmail.fulfilled.match(result)) {
            dispatch(
              toasterActions.createToast({
                id: 'email-confirmation-success',
                skin: ToastSkin.EMAIL_CONFIRMATION_SUCCESS,
              }),
            );
          } else {
            dispatch(
              toasterActions.createToast({
                id: 'email-confirmation-error',
                skin: ToastSkin.EMAIL_CONFIRMATION_ERROR,
              }),
            );
          }
        }
      }

      // if the user created his personal address
      if (!emailAddress && data.email) {
        await dispatch(
          createPersonalEmail({
            emailAddress: data.email,
          }),
        );
        dispatch(getPersonalEmail());
      }

      dispatch(updateNotificationSettings(omit(formData, 'email')));

      setFormData({
        ...formData,
        email: data.email,
      });
      showSuccessNotification();
    } catch (err) {
      showErrorNotification();
    }
  };

  // fetch personal email address
  useEffect(() => {
    if (!personalEmail) {
      dispatch(getPersonalEmail());
    }
  }, [colleagueUUID, personalEmail]);

  // fetch settings
  useEffect(() => {
    if (!notificationSettings) {
      dispatch(getNotificationSettings());
    }
  }, [notificationSettings]);

  useEffect(() => {
    setEmailAddress(personalEmail!);
    setFormData({
      email: personalEmail ? personalEmail.emailAddress : '',
      receiveEventsEmailNotifications,
      receivePostsEmailNotifications,
    });
  }, [personalEmail, receivePostsEmailNotifications, receiveEventsEmailNotifications]);

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
              defaultValue={formData.email}
              name={'email'}
              placeholder={'email'}
              // @ts-ignore
              error={errors['email']?.message}
              required
            />
          </FieldWrapper>
        </form>
      </Content>
      <Button size={'md'} onClick={handleSubmit(onSubmit)}>
        Save Changes
      </Button>
    </Wrapper>
  );
};

export default NotificationSettings;
