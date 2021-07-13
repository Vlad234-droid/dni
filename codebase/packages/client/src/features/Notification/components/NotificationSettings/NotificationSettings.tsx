import React, { FC, useState, useEffect } from 'react';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import Button from '@beans/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import omit from 'lodash.omit';
import useQuery from 'hooks/useQuery';

import { ToastSkin, toasterActions } from 'features/Toaster';
import { FieldWrapper, TextInput } from 'features/Common';

import schema from '../../config/schema';
import { FormData, EmailNotificationSettings, EmailAddress } from '../../config/types';
import { Wrapper, Content, Title } from './styled';
import API from 'utils/api';
import useStore from 'hooks/useStore';

const SUCCESS_TOAST_ID = 'settings-success-toast';
const ERROR_TOAST_ID = 'settings-success-toast';

const NotificationSettings: FC = () => {
  const [emailAddress, setEmailAddress] = useState<EmailAddress>();
  const [formData, setFormData] = useState({
    email: '',
    receivePostsEmailNotifications: false,
    receiveEventsEmailNotifications: false,
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
      // if the user changed their personal address
      if (emailAddress?.emailAddress && data.email && emailAddress?.emailAddress != data.email) {
        await API.contact.updatePersonalEmail(emailAddress?.addressIdentifier, {
          ...emailAddress,
          emailAddress: data.email,
        });
      }

      // if the user created his personal address
      if (!emailAddress && data.email) {
        await API.contact.createPersonalEmail({
          emailAddress: data.email,
        });
      }

      await API.contact.updateNotificationsSettings(omit(formData, 'email'));

      setFormData({
        ...formData,
        email: data.email,
      });
      showSuccessNotification();
    } catch (err) {
      showErrorNotification();
    }
  };

  // fetch settings
  useEffect(() => {
    (async () => {
      const emailNotificationSettings = await API.contact.getNotificationsSettings<EmailNotificationSettings>();

      if (emailNotificationSettings?.settings) {
        setFormData((formData) => ({
          ...formData,
          ...emailNotificationSettings.settings,
        }));
      }
    })();
  }, []);

  // fetch personal email address
  useEffect(() => {
    (async () => {
      const emailAddress = await API.contact.getPersonalEmail<EmailAddress>();

      if (emailAddress?.emailAddress) {
        setEmailAddress(emailAddress);

        setFormData((formData) => ({
          ...formData,
          email: emailAddress.emailAddress,
        }));
      }
    })();
  }, [colleagueUUID]);

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
