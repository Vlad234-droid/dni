import React, { FC } from 'react';
import Icon from '@beans/icon';

import theme from 'theme';

import { Wrapper, Container, IconWrapper, Content, Title, Message, BtnContainer } from './styled';
import { Link } from 'react-router-dom';
import { Page } from '../../../Page';
import Button from '@beans/button';

type Props = {
  errorData?: {
    title?: string;
    message?: string;
  };
  showButton?: boolean;
  fullWidth?: boolean;
};

const DEFAULT_TITLE = 'An error has occurred.';
const DEFAULT_MESSAGE = 'Please try reloading the page';

const Error: FC<Props> = ({ errorData, showButton = false, fullWidth = false }) => {
  const handleReloadBtnClick = () => window.location.reload();

  return (
    <Wrapper fullWidth={fullWidth} data-testid='error'>
      <Container>
        <IconWrapper>
          <Icon graphic='error' size='sm' background={theme.colors.error} inverse />
        </IconWrapper>
        <Content>
          <Title>{errorData?.title || DEFAULT_TITLE}</Title>
          <Message>{errorData?.message || DEFAULT_MESSAGE}</Message>
        </Content>
      </Container>
      <BtnContainer>
        <Button onClick={handleReloadBtnClick} variant='primary'>
          Reload
        </Button>
        {showButton && (
          <Link to={Page.NETWORK_NEWS}>
            <Button variant='primary'>Network News</Button>
          </Link>
        )}
      </BtnContainer>
    </Wrapper>
  );
};

export default Error;
