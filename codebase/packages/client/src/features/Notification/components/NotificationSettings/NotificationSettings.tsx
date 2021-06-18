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
  const [isFormVisible, setFormVisible] = useState(false);
  const [email, setEmail] = useState('test@tesco.com');
  const { handleSubmit, errors, register, control } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCheckBoxChange = () => {
    setFormVisible(!isFormVisible);
  }

  const onSubmit = (data: FormData) => {
    setEmail(data.email);
  }

  return (
    <Wrapper>
      <CheckboxWithLabel
        id='receive-email'
        labelText='Receive email notifications'
        onChange={handleCheckBoxChange}
      />
      {isFormVisible && (
        <Content>
          <Title>Enter email address</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
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