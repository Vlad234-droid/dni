import styled from 'styled-components';

import { textXS } from 'styles';

// TODO: apply mask for image
export const Wrapper = styled.div`
  flex-grow: 1;
  flex-basis: 300px;
  ${textXS}

  &:not(:last-child) {
    margin-right: 6px;
  }
`;

export const ImageWrapper = styled.div`
  margin-bottom: 25px;
  height: 73px;
  width: 100%;
`;

export const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
`;

export const Title = styled.h3`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.tescoBlue};
`;

export const Description = styled.div`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;
