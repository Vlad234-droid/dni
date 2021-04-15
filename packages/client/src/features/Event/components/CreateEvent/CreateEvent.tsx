import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@beans/button';
import { Row, Grid, Column } from '@beans/grid';
import { unwrapResult } from '@reduxjs/toolkit';
import { useMedia } from 'context/InterfaceContext';
import {
  TextArea,
  TextInput,
  FileInput,
  DateTimePicker,
} from 'features/Common';
import Media from 'styles/media';
import { FieldWrapper } from 'features/Common/styled';
import { ToastSkin, toasterActions } from 'features/Toaster';

import { FormData } from '../../config/types';
import schema from '../../config/schema';
import { createOne, uploadImage, SetOnePayload } from '../../store';

const CreateEventForm: FC = () => {
  const dispatch = useDispatch();
  const { handleSubmit, errors, register, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const image = data.image;
    const result = await dispatch(
      createOne(({
        ...data,
        network: null,
        image: null,
      } as unknown) as SetOnePayload),
    );
    // @ts-ignore
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

  const { isTablet } = useMedia();
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldWrapper>
          <Controller
            name={'image'}
            control={control}
            render={(props) => (
              <FileInput
                label={'Image (optional)'}
                onChange={props.onChange}
                error={errors['image']?.message}
                id={'image'}
              />
            )}
          />
        </FieldWrapper>
        <FieldWrapper>
          <TextInput
            // @ts-ignore
            domRef={register}
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
                // @ts-ignore
                domRef={register}
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
                // @ts-ignore
                domRef={register}
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
              <Controller
                name={'startDate'}
                control={control}
                render={(props) => (
                  <DateTimePicker
                    // @ts-ignore
                    error={errors['startDate']?.message}
                    labels={['Start date', 'Start time']}
                    onChange={props.onChange}
                    required
                  />
                )}
              />
            </Column>
            <Column size={isTablet ? 24 : 12}>
              <Controller
                name={'endDate'}
                control={control}
                render={(props) => (
                  <DateTimePicker
                    // @ts-ignore
                    error={errors['endDate']?.message}
                    labels={['End date', 'End time']}
                    onChange={props.onChange}
                    required
                  />
                )}
              />
            </Column>
          </Row>
        </FieldWrapper>
        <FieldWrapper>
          <TextArea
            // @ts-ignore
            domRef={register}
            name={'description'}
            label={'Description'}
            error={errors['description']?.message}
          />
        </FieldWrapper>
        <FieldWrapper>
          <TextInput
            // @ts-ignore
            domRef={register}
            name={'surveryUrl'}
            placeholder={'A few word about your event'}
            label={'Link to Survey'}
            // @ts-ignore
            error={errors['surveryUrl']?.message}
            id={'surveryUrl'}
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
