import React, { FC, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { Row, Grid } from '@beans/grid';
import { ToastSkin, toasterActions } from 'features/Toaster';

import { FieldWrapper } from 'features/Common/styled';
import { partners } from '../../config/formFields';
import schema from '../../config/schema';
import { FormData } from '../../config/types';
import Media from 'styles/media';
import { PartnersEditor } from 'features/Network';
import { FileInput, TextArea, TextInput } from '../../../Common';

const AddNetworkForm: FC = () => {
  const [open, setOpen] = useState(false);
  const formContainer = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);
  const { handleSubmit, errors, register, control } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  // TODO fix when implement redux for this
  //@ts-ignore
  const onSubmit = (data: FormData) => {
    dispatch(
      toasterActions.createToast({
        skin: ToastSkin.ENTITY_CREATE_SUCCESS,
      }),
    );
    console.log(data);
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper>
          <Controller
            name={'image'}
            control={control}
            render={(props) => (
              <FileInput
                label={'Image (optional)'}
                onChange={props.onChange}
                // @ts-ignore
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
          <TextInput
            // @ts-ignore
            domRef={register}
            name={'manager'}
            placeholder={'BruceDickinson@tesco.com'}
            label={'Content Manager of Network'}
            // @ts-ignore
            error={errors['manager']?.message}
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <TextInput
            // @ts-ignore
            domRef={register}
            name={'email'}
            placeholder={'email'}
            label={'Contact email'}
            // @ts-ignore
            error={errors['email']?.message}
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <TextArea
            // @ts-ignore
            domRef={register}
            name={'description'}
            label={'Description'}
            placeholder={'A few word about this network'}
            error={errors['description']?.message}
          />
        </FieldWrapper>
        <>
          {!open && (
            <Button variant='link' onClick={toggleOpen}>
              <Icon graphic='edit' inverse={true} />
              Edit list of partners
            </Button>
          )}
          <div ref={formContainer} />
        </>
        <ButtonContainer>
          <Grid>
            <Row>
              <Col>
                <Button type='submit' size={'md'}>
                  Publish network
                </Button>
              </Col>
              <Col>
                <Button variant='secondary' disabled>
                  Preview
                </Button>
              </Col>
            </Row>
          </Grid>
        </ButtonContainer>
      </form>
      {formContainer.current &&
        open &&
        createPortal(
          <PartnersEditor partners={partners} onClose={toggleOpen} />,
          formContainer.current,
        )}
    </FormWrapper>
  );
};

export default AddNetworkForm;

const Col = styled.div`
  margin-right: 24px;
`;

const ButtonContainer = styled.div`
  margin-top: 48px;
`;

const FormWrapper = styled.div`
  padding: 0 32px;

  ${Media.desktop`
    width: 70%;
  `}

  ${Media.phone`
    padding: 0 16px;
  `}
`;
