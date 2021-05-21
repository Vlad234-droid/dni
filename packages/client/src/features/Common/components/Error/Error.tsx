import React, { FC } from 'react';
import Icon from '@beans/icon';

import theme from 'theme';

import {
  Wrapper,
  Container,
  IconWrapper,
  Content,
  Title,
  Message,
} from './styled';
import { Link } from 'react-router-dom';
import { Page } from '../../../Page';
import Button from '@beans/button';

type Props = {
  errorData: {
    title?: string;
    message?: string;
  };
  showButton?: boolean;
};

const DEFAULT_TITLE = 'Something went wrong';
const DEFAULT_MESSAGE = 'Please, try again.';

const Error: FC<Props> = ({ errorData, showButton = false }) => (
  <Wrapper data-testid='not-found'>
    <Container>
      <IconWrapper>
        <Icon
          graphic='error'
          size='sm'
          background={theme.colors.error}
          inverse
        />
      </IconWrapper>
      <Content>
        <Title>{errorData.title || DEFAULT_TITLE}</Title>
        <Message>{errorData.message || DEFAULT_MESSAGE}</Message>
      </Content>
    </Container>
    {showButton && (
      <Link to={Page.NETWORK_NEWS}>
        <Button variant='primary'>Network News</Button>
      </Link>
    )}
  </Wrapper>
);

export default Error;
