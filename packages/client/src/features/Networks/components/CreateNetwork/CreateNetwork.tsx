import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '@beans/button';
import { Row, Grid } from '@beans/grid';

import GenericForm from 'features/GenericForm';
import formFields from '../../config/formFields';
import schema from '../../config/schema';
import { FormData, Names } from '../../config/types';
import Media from '../../../../styles/media';

const AddNetworkForm: FC = () => {
  const dispatch = useDispatch();
  // TODO fix when implement redux for this
  //@ts-ignore
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <FormWrapper>
      <GenericForm<FormData, Names>
        {...{ formFields, schema, onSubmit }}
        renderButtons={() => (
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
        )}
      />
    </FormWrapper>
  );
};

export default AddNetworkForm;

const Col = styled.div`
  margin-right: 24px;
`;

const FormContent = styled.div`
  margin-bottom: 48px;
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
