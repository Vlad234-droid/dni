import React, { FC } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@beans/button';
import { Row, Grid, Column } from '@beans/grid';
import { useMedia } from 'context/InterfaceContext';
import {
  TextArea,
  TextInput,
  FileInput,
  DateTimePicker,
} from 'features/Common';
import schema from '../../config/schema';
import { FormData } from '../../config/types';
import Media from 'styles/media';
import { FieldWrapper } from 'features/Common/styled';
import { ToastSkin, toasterActions } from 'features/Toaster';
import { unwrapResult } from '@reduxjs/toolkit';
import useDispatch from 'hooks/useDispatch';

import { createOne, uploadImage, SetOnePayload } from '../../store';

const CreateEventForm: FC = () => {
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    const image = data.image;
    const result = await dispatch(
      createOne(({
        ...data,
        network: null,
        image: null,
      } as unknown) as SetOnePayload),
    );

    if (createOne.fulfilled.match(result)) {
      const event = unwrapResult(result);

      if (image) {
        await dispatch(uploadImage({ image, id: event.id }));
      }

      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_SUCCESS,
        }),
      );
    } else {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_ERROR,
        }),
      );
    }
  };

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, errors, register, setValue, unregister } = methods;
  const { isTablet } = useMedia();
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldWrapper>
          <FileInput
            unregister={unregister}
            setValue={setValue}
            register={register}
            name={'image'}
            label={'Image (optional)'}
            error={errors['image']?.message}
            id={'image'}
          />
        </FieldWrapper>
        <FieldWrapper>
          <TextInput
            register={register}
            name={'title'}
            placeholder={'Name of event'}
            label={'Name your event'}
            // @ts-ignore
            error={errors['title']?.message}
            id={'title'}
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <Row>
            <Column size={17}>
              <TextInput
                register={register}
                name={'network'}
                placeholder={'Name your network'}
                label={'Network'}
                error={errors['network']?.message}
                id={'image'}
                required
              />
            </Column>
            <Column size={7}>
              <TextInput
                register={register}
                name={'maxParticipants'}
                placeholder={'1'}
                label={'Max participants'}
                error={errors['maxParticipants']?.message}
                id={'maxParticipants'}
                required
              />
            </Column>
          </Row>
        </FieldWrapper>
        <FieldWrapper>
          <Row>
            <Column size={isTablet ? 24 : 12}>
              <DateTimePicker
                name={'startedAt'}
                unregister={unregister}
                setValue={setValue}
                register={register}
                // @ts-ignore
                error={errors['startedAt']?.message}
                labels={['Start date', 'Start time']}
                required
              />
            </Column>
            <Column size={isTablet ? 24 : 12}>
              <DateTimePicker
                name={'finishedAt'}
                unregister={unregister}
                setValue={setValue}
                register={register}
                // @ts-ignore
                error={errors['finishedAt']?.message}
                labels={['End date', 'End time']}
                required
              />
            </Column>
          </Row>
        </FieldWrapper>
        <FieldWrapper>
          <TextArea
            register={register}
            name={'description'}
            label={'Description'}
            error={errors['description']?.message}
          />
        </FieldWrapper>
        <FieldWrapper>
          <TextInput
            register={register}
            name={'surveyLink'}
            placeholder={'A few word about your event'}
            label={'Link to Survey'}
            // @ts-ignore
            error={errors['surveyLink']?.message}
            id={'surveyLink'}
            required
          />
        </FieldWrapper>
        <Grid>
          <Row>
            <Col>
              <Button type='submit' size={'md'}>
                Submit
              </Button>
            </Col>
            <Col>
              <Button variant='secondary'>Skip this</Button>
            </Col>
          </Row>
        </Grid>
      </form>
    </FormWrapper>
  );
};

export default CreateEventForm;

const Col = styled.div`
  margin-right: 24px;
`;

const FormWrapper = styled.div`
  padding: 0 32px;

  ${Media.tablet`
    max-width: 578px;
  `}

  ${Media.phone`
    padding: 0 16px;
  `}
`;
