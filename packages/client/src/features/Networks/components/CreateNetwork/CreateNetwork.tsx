import React, { FC, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { Row, Grid } from '@beans/grid';
import { ToastSkin, toasterActions } from 'features/Toaster';

import GenericForm from 'features/GenericForm';
import formFields, { partners } from '../../config/formFields';
import schema from '../../config/schema';
import { FormData, Names } from '../../config/types';
import Media from '../../../../styles/media';
import { PartnersEditor } from 'features/Networks';

const AddNetworkForm: FC = () => {
  const [open, setOpen] = useState(false);
  const formContainer = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

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
      <GenericForm<FormData, Names>
        {...{ formFields, schema, onSubmit }}
        renderContent={() => (
          <>
            {!open && (
              <Button variant='link' onClick={toggleOpen}>
                <Icon graphic='edit' inverse={true} />
                Edit list of partners
              </Button>
            )}
            <div ref={formContainer} />
          </>
        )}
        renderButtons={() => (
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
        )}
      />
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
