import React, { FC, useState } from 'react';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import Button from '@beans/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FieldWrapper, TextInput } from 'features/Common';

import schema from '../../config/schema';
import { FormData } from '../../config/types';
import { Wrapper, Content, Title } from './styled';

const NotificationSettings: FC = () => {
  const [formData, setFormData] = useState({
    email: 'test@tesco.com',
    receivePosts: false,
    receiveEvents: false,
  });
  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setFormData({
      ...formData,
      email: data.email,
    });
  }

  return (
    <Wrapper>
      <CheckboxWithLabel
        id='receive-email-for-posts'
        labelText='Receive email notifications for posts'
        onChange={() => setFormData({...formData, receivePosts: !formData.receivePosts})}
      />
      <CheckboxWithLabel
        id='receive-email-for-events'
        labelText='Receive email notifications for events'
        onChange={() => setFormData({...formData, receiveEvents: !formData.receiveEvents})}
      />
      {(formData.receivePosts || formData.receiveEvents) && (
        <Content>
          <Title>Enter email address</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type='submit' size={'md'}>
              Save Changes
            </Button>
          </form>
        </Content>
      )}
    </Wrapper>
  )
};

export default NotificationSettings;