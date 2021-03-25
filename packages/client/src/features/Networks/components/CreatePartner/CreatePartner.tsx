import React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Icon from '@beans/icon';
import Button from '@beans/button';
import { Row, Column } from '@beans/grid';

import { TextInput, FileInput } from 'features/Common';

interface FormData {
  logo?: File;
  name: string;
  link?: string;
}

interface Partner extends FormData {
  id: number;
}

const schema: Yup.SchemaOf<FormData> = Yup.object().shape({
  logo: Yup.mixed().nullable(),
  name: Yup.string().required('Name is required'),
  link: Yup.string().url(),
});

type Props = {
  partner?: Partner;
  onCancel?: () => void;
};
const CreatePartner = ({ partner, onCancel }: Props) => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    unregister,
  } = methods;
  const submit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    reset();
    if (typeof onCancel !== 'undefined') {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Row>
        <Column>
          <TextInput
            placeholder={'Official Name'}
            label={'Partners name'}
            defaultValue={partner?.name}
            name={'name'}
            error={errors['name']! && errors['name'].message}
            // @ts-ignore
            register={register}
          />
        </Column>
        <Column>
          <TextInput
            placeholder={'Website or social network'}
            label={'Link to Partner (optional)'}
            defaultValue={partner?.link}
            name={'link'}
            error={errors['link']! && errors['link'].message}
            // @ts-ignore
            register={register}
          />
        </Column>
      </Row>
      <FileInput
        name={'logo'}
        label={'Partner’s logo (optional)'}
        register={register}
        setValue={setValue}
        unregister={unregister}
      />
      <ActionContainer>
        <div>
          {typeof partner !== 'undefined' ? (
            <>
              <Button type={'submit'}>Save</Button>
              <Button variant={'secondary'} onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type={'submit'}>Save changes</Button>
          )}
        </div>
        {typeof partner !== 'undefined' && (
          <div>
            <Button variant='link'>
              <Icon graphic='trash' />
            </Button>
          </div>
        )}
      </ActionContainer>
    </form>
  );
};

export default CreatePartner;

const ActionContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button ~ button {
    margin-left: 24px;
  }
`;
