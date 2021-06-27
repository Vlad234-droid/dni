import styled from 'styled-components';

import Media from 'styles/media';
import { textXS } from 'styles';

export const Wrapper = styled.div`
  ${textXS};
  margin-bottom: 32px;

  &:not(:last-child) {
    ${Media.tablet`
      margin-right: 12px;
  `}
  }

  ${Media.tablet`
    margin-bottom: 0;
    flex-grow: 1;
    flex-basis: 300px;
  `}
`;

export const ImageWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;

  ${Media.tablet`
    margin-bottom: 25px;
    height: 73px;
  `}
`;

export const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
`;

export const Title = styled.h3`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.tescoBlue};

  ${Media.tablet`
    margin-bottom: 10px;
  `}
`;

export const Description = styled.div`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;
