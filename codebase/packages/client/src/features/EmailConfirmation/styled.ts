import styled from 'styled-components';

import Media from 'styles/media';
import { textXS } from 'styles';

export const Wrapper = styled.div`
  position: relative;
`;

export const Content = styled.div`
  ${textXS};

  padding: 24px 0 0;
  color: ${({ theme }) => theme.colors.grayscale};
  
  button {
    margin-top: 24px;
  }

  ${Media.tablet`
    padding: 32px 40px 0 32px;
    flex-direction: row;
    font-size: 20px;
    line-height: 24px;
  `}NotificationSettings/NotificationSettings.tsx
`;

export const Email = styled.span`
  font-weight: 600;
`;
