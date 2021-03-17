import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
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

const CreateEventForm: FC = () => {
  const dispatch = useDispatch();
  // TODO fix when implement redux for this
  //@ts-ignore
  const onSubmit = (data: FormData) => console.log(data);
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, errors, register, setValue, unregister } = methods;
  const { isTablet } = useMedia();
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                name={'participantCount'}
                placeholder={'1'}
                label={'Max participants'}
                error={errors['participantCount']?.message}
                id={'participantCount'}
                required
              />
            </Column>
          </Row>
        </FieldWrapper>
        <FieldWrapper>
          <Row>
            <Column size={isTablet ? 24 : 12}>
              <DateTimePicker
                name={'startDate'}
                unregister={unregister}
                setValue={setValue}
                register={register}
                // @ts-ignore
                error={errors['startDate']?.message}
                labels={['Start date', 'Start time']}
                required
              />
            </Column>
            <Column size={isTablet ? 24 : 12}>
              <DateTimePicker
                name={'endDate'}
                unregister={unregister}
                setValue={setValue}
                register={register}
                // @ts-ignore
                error={errors['endDate']?.message}
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
