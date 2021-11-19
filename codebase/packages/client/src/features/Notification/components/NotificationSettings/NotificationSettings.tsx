import React, { FC, useState, useEffect } from 'react';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import Button from '@beans/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useDispatch from 'hooks/useDispatch';
import useQuery from 'hooks/useQuery';
import useStore from 'hooks/useStore';
import { FieldWrapper, TextInput } from 'features/Common';

import schema from '../../config/schema';
import {
  getNotificationSettings,
  updateNotificationSettings,
} from '../../store';
import useSaveEmail from '../../hooks/useSaveEmail';
import { Wrapper, Content, Title } from './styled';

const NotificationSettings: FC = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const isUnsubscribe = query.get('unsubscribe') == 'true';

  const { notificationSettings: { settings: { receivePostsEmailNotifications, receiveEventsEmailNotifications } } } = useStore((state) => state.notifications);
  const [formData, setFormData] = useState({
    receivePostsEmailNotifications,
    receiveEventsEmailNotifications,
  });
  const [email, onSubmit] = useSaveEmail(() => dispatch(updateNotificationSettings(formData)));

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(schema),
  });

  // fetch settings
  useEffect(() => {
    dispatch(getNotificationSettings());
  }, []);

  useEffect(() => {
    setFormData({
      receivePostsEmailNotifications,
      receiveEventsEmailNotifications,
    });
  }, [receivePostsEmailNotifications, receiveEventsEmailNotifications]);

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
