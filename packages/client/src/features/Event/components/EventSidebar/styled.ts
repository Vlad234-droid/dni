import styled from 'styled-components';

import { headingSM } from 'styles';

export const Wrapper = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h5`
  ${headingSM};
  margin-bottom: 8px;
`;

export const List = styled.div`
  margin-bottom: 24px;

  & > div {
    margin-bottom: 8px;
  }
`;
